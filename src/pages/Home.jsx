import React, { useEffect, useState } from 'react';
import '@/styles/home.scss';
import { getTrending, getPopular, getCategories } from '@/api/index';
import Card from '@/components/Card';
import Button from '@/components/Button';
import SlideSection from '@/containers/SlideSection';
import { Link } from 'react-router-dom';

function Home() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const mapCardItems = (data) => {
      const mapItems = data.map((item) => ({
        id: item.id,
        element: (
          <Link to={`details/${item.media_type}/${item.id}`} className="link">
            <Card
              data={{
                id: item.id,
                title: item.title || item.name,
                image: `https://image.tmdb.org/t/p/w300${item.poster_path}`
              }}
            />
          </Link>
        )
      }));
      return mapItems;
    };

    const getData = async () => {
      try {
        setLoading(true);
        const trendingData = await getTrending({ mediaType: 'all' });
        const filters = ['tv', 'movie'];
        const filtered = trendingData.results.filter((item) =>
          filters.includes(item.media_type)
        );
        filtered.sort((a, b) => b.popularity - a.popularity);
        setTrendingItems(mapCardItems(filtered));

        const popularData = await getPopular({});
        setPopularItems(mapCardItems(popularData.results));

        const genresData = await getCategories({});
        setGenres(genresData);
      } catch (error) {
        console.log('🚀 ~ file: Home.jsx:65 ~ getData ~ error', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
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
