import React, { useEffect, useState } from 'react';
import '@/styles/home.scss';
import { getTrending, getPopular, getCategories } from '@/api/index';
import Card from '@/components/Card';
import Button from '@/components/Button';
import SlideSection from '@/containers/SlideSection';

function Home() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const mapCardItems = (data) => {
      const mapItems = data.map((item) => ({
        id: item.id,
        element: (
          <Card
            data={{
              id: item.id,
              title: item.title || item.name,
              image: `https://image.tmdb.org/t/p/w300${item.poster_path}`
            }}
          />
        )
      }));
      return mapItems;
    };

    const getTrendingItems = async (params = {}) => {
      const data = await getTrending(params);
      return data.results;
    };

    const getPopularItems = async (params = {}) => {
      const data = await getPopular(params);
      return data.results;
    };

    const getAllGenres = async (params = {}) => {
      const data = await getCategories(params);
      return data;
    };

    getTrendingItems({ mediaType: 'all' }).then((data) => {
      const filters = ['tv', 'movie'];
      const filtered = data.filter((item) => filters.includes(item.media_type));
      filtered.sort((a, b) => b.popularity - a.popularity);
      setTrendingItems(mapCardItems(filtered));
    });

    getPopularItems()
      .then((data) => {
        setPopularItems(mapCardItems(data));
      })
      .catch((err) => console.log(err));

    getAllGenres()
      .then((data) => setGenres(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <SlideSection
        title="Trending"
        slides={trendingItems}
        link="trending"
        time="Today"
      />
      <SlideSection
        title="Most Popular"
        slides={popularItems}
        link="popular"
        time="Today"
      />
      <section className="shelf shelf--genres">
        <header className="shelf__header">
          <h2 className="shelf__title">Movie Genres</h2>
        </header>
        <ul className="list list--row">
          {genres.map((item) => (
            <li key={item.id} className="list__item">
              <Button
                text={item.name}
                variant="gradient"
                style={{ fontWeight: 500 }}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Home;
