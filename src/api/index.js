import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'applicatin/json;charset=utf-8'
  },
  params: {
    api_key: import.meta.env.VITE_API_KEY
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

const getGenres = async ({ mediaType = 'movie' } = {}) => {
  const { data } = await api(`genre/${mediaType}/list`);
  return data.genres;
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

const discoverMedia = async ({ mediaType, genreIdString, sortBy, page }) => {
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
  discoverMedia
};
