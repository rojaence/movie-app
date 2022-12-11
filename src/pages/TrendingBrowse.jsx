import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import useToggleButtonGroup from '@/hooks/useToggleButtonGroup';

import { getTrending, getPopular } from '@/api/index';
import Card from '@/components/Card';
import '@/styles/browse.scss';

function Browse({ pageType }) {
  const pageTitle = {
    trending: 'Trending',
    popular: 'Most popular'
  };
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState([]);

  const mediaTypeList = [
    {
      text: 'movies',
      value: 'movie'
    },
    {
      text: 'series',
      value: 'tv'
    }
  ];

  const timeWindowList = [
    {
      text: 'Today',
      value: 'day'
    },
    {
      text: 'Week',
      value: 'week'
    }
  ];

  const mediaType = useToggleButtonGroup({
    initialItems: mediaTypeList,
    initialSelected: mediaTypeList[0]
  });

  const timeWindow = useToggleButtonGroup({
    initialItems: timeWindowList,
    initialSelected: timeWindowList[0]
  });

  const mapCardItems = (data) => {
    const mapItems = data.map((item) => ({
      id: item.id,
      title: item.title || item.name,
      image: `https://image.tmdb.org/t/p/w300${item.poster_path}`
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

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    if (pageType === 'trending') {
      getTrendingItems({
        mediaType: mediaType.selected.value,
        timeWindow: timeWindow.selected.value
      }).then((data) => {
        setGallery(mapCardItems(data));
        setLoading(false);
      });
    } else if (pageType === 'popular') {
      getPopularItems({ mediaType: mediaType.selected.value }).then((data) => {
        setGallery(mapCardItems(data));
        setLoading(false);
      });
    }
  }, [mediaType, timeWindow]);

  return (
    <section className="browse container">
      <header className="browse__header">
        <h2 className="browse__title">{pageTitle[pageType]}</h2>
        <div className="browse__options">
          {pageType === 'trending' && (
            <ToggleButtonGroup
              items={timeWindow.items}
              selected={timeWindow.selected}
              toggle={timeWindow.toggle}
              color="info"
              buttonVariant="outlined"
            />
          )}
          <ToggleButtonGroup
            items={mediaType.items}
            selected={mediaType.selected}
            toggle={mediaType.toggle}
            color="primary"
            buttonVariant="outlined"
          />
        </div>
      </header>
      <div className="browse__body">
        <div className="gallery">
          {gallery.map((item) => (
            <Card data={item} key={`${item.id}-${item.title || item.name}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

Browse.defaultProps = {
  pageType: 'trending'
};

Browse.propTypes = {
  pageType: PropTypes.string
};

export default Browse;
