import React, { useEffect, useState, useContext } from 'react';
import { getTrending, getPopular } from '@/api/index';
import Card from '@/components/Card';
import SlideSection from '@/containers/SlideSection';
import CardSkeleton from '@/components/CardSkeleton';

import { Link } from 'react-router-dom';
import { SnackbarContext } from '@/context/SnackbarContext';

function Home() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const snackbar = useContext(SnackbarContext);

  const mapCardItems = (data) => {
    const mapItems = data.map((item) => ({
      id: item.id,
      element: (
        <Link to={`details/${item.media_type}/${item.id}`} className="link">
          <Card
            data={{
              id: item.id,
              title: item.title || item.name,
              image: item.poster_path
                ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                : '',
              mediaType: item.media_type || ''
            }}
          />
        </Link>
      )
    }));
    return mapItems;
  };

  const skeletonCards = (quantity) => {
    const items = [];
    for (let i = 1; i <= quantity; i += 1) {
      items.push({
        id: `skeleton-${i}`,
        element: <CardSkeleton />
      });
    }
    return items;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const trendingData = await getTrending({ mediaType: 'all' });
        const filters = ['tv', 'movie'];
        const filtered = trendingData.results.filter((item) =>
          filters.includes(item.media_type)
        );
        setTrendingItems(mapCardItems(filtered));

        const popularData = await getPopular({});
        setPopularItems(mapCardItems(popularData.results));
      } catch (error) {
        snackbar.show({ message: error.message, color: 'error' });
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="container">
      <SlideSection
        title="Trending"
        slides={loading ? skeletonCards(6) : trendingItems}
        link="trending"
        time="Today"
      />
      <SlideSection
        title="Most Popular"
        slides={loading ? skeletonCards(6) : popularItems}
        link="popular"
      />
    </div>
  );
}

export default Home;
