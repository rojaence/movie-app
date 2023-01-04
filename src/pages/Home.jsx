import React, { useEffect, useState, useContext } from 'react';
import { getTrending, getPopular } from '@/api/index';
import Card from '@/components/Card';
import SlideSection from '@/containers/SlideSection';
import CardSkeleton from '@/components/CardSkeleton';

import { Link } from 'react-router-dom';
import { SnackbarContext } from '@/context/SnackbarContext';
import { generateSkeletons } from '@/utils';
import '@/styles/home.scss';

function Home() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
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
        const trendingBanners = trendingData.results
          .sort((a, b) => a.popularity - b.popularity)
          .slice(0, 3);
        const popularBanners = popularData.results
          .sort((a, b) => a.popularity - b.popularity)
          .slice(0, 3);
        setBannerImages(trendingBanners.concat(popularBanners));
      } catch (error) {
        snackbar.show({ message: error.message, color: 'error' });
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <section className="home container">
      <div className="home-banner">
        <h2 className="main-title">
          Welcome, <br /> Millions of movies, TV shows and people to discover.
        </h2>
        <div className="home-banner__backdrop" />
        <div className="home-banner__poster-container">
          {bannerImages.map((banner) => (
            <img
              src={`https://image.tmdb.org/t/p/w300${banner.poster_path}`}
              alt="poster"
              key={banner.id}
              className="poster-image"
            />
          ))}
        </div>
      </div>
      <SlideSection
        title="Trending"
        slides={
          loading ? generateSkeletons(6, <CardSkeleton />) : trendingItems
        }
        link="trending"
        time="Today"
      />
      <SlideSection
        title="Popular"
        slides={loading ? generateSkeletons(6, <CardSkeleton />) : popularItems}
        link="popular"
      />
    </section>
  );
}

export default Home;
