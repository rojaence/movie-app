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
  timeWindow = 'day'
} = {}) => {
  const { data } = await api(`trending/${mediaType}/${timeWindow}`);
  return data.results;
};

const getPopular = async ({ mediaType = 'movie' }) => {
  const { data } = await api(`${mediaType}/popular`);
  return data.results;
};

const getCategories = async ({ mediaType = 'movie' }) => {
  const { data } = await api(`genre/${mediaType}/list`);
  return data.genres;
};

export { getTrending, getCategories, getPopular };
