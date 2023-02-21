import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'applicatin/json;charset=utf-8'
  },
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    language: localStorage.getItem('lng') || 'en'
  }
});

const getTrending = async ({
  mediaType = 'movie',
  timeWindow = 'day',
  page = 1
} = {}) => {
  const { data } = await api(
    `trending/${mediaType}/${timeWindow}?page=${page}`
  );
  return data;
};

const getPopular = async ({ mediaType = 'movie', page = 1 }) => {
  const { data } = await api(`${mediaType}/popular`, {
    params: {
      page
    }
  });
  // Solution to missing parameter in popular items from API - media_type
  const fixResults = data.results.map((item) => ({
    ...item,
    media_type: mediaType
  }));
  data.results = fixResults;
  return data;
};

const getMediaDetails = async ({ mediaType, mediaId } = {}) => {
  const { data } = await api(`${mediaType}/${mediaId}`);
  return data;
};

const getSimilarContent = async ({ mediaType, mediaId }) => {
  const { data } = await api(`${mediaType}/${mediaId}/similar`);
  return data;
};

const getRecommendations = async ({ mediaType, mediaId }) => {
  const { data } = await api(`${mediaType}/${mediaId}/recommendations`);
  const fixResults = data.results.map((item) => ({
    ...item,
    media_type: mediaType
  }));
  data.results = fixResults;
  return data;
};

// * To fix problem in url ~ #/{tv} or {movie}/{genreName} to standard names
/*
  Create an array with original names and translation with the user language
*/
const getGenres = async ({ mediaType = 'movie' } = {}) => {
  const { data } = await api(`genre/${mediaType}/list`);
  const { data: dataEn } = await api(`genre/${mediaType}/list`, {
    params: {
      language: 'en'
    }
  });
  const genres = dataEn.genres.reduce((acc, curr) => {
    const translation = data.genres.find((o) => o.id === curr.id);
    acc.push({ ...curr, translation: translation.name });
    return acc;
  }, []);
  return genres;
};

const searchMedia = async ({ query, mediaType, page }) => {
  const { data } = await api(`search/${mediaType}`, {
    params: {
      query,
      page
    }
  });
  return data;
};

const getPersonCredits = async ({ mediaType, personId }) => {
  const { data } = await api(`person/${personId}/${mediaType}_credits`);
  // Solution to missing parameter in popular items from API - media_type
  const crewFix = data.crew.map((item) => ({ ...item, media_type: mediaType }));
  const castFix = data.cast.map((item) => ({ ...item, media_type: mediaType }));
  data.crew = crewFix;
  data.cast = castFix;
  return data;
};

const getMultimediaData = async ({ mediaType, dataType, mediaId }) => {
  const { data } = await api(`${mediaType}/${mediaId}/${dataType}`);
  return data;
};

const discoverMedia = async ({
  mediaType,
  genreIdString = '',
  sortBy,
  page
}) => {
  const { data } = await api(`discover/${mediaType}`, {
    params: {
      with_genres: genreIdString,
      sort_by: sortBy,
      page
    }
  });
  return data;
};

export {
  getTrending,
  getGenres,
  getPopular,
  getMediaDetails,
  searchMedia,
  getSimilarContent,
  getRecommendations,
  getPersonCredits,
  getMultimediaData,
  discoverMedia
};
