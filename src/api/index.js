const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const getTrending = async () => {
  const request = await fetch(`${apiUrl}/trending/movie/day?api_key=${apiKey}`);
  const response = await request.json();
  return response.results;
};

const getCategories = async () => {
  console.log('TODO: GET CATEGORIES');
};

export { getTrending, getCategories };

/* export default {
  getTrending
}; */
