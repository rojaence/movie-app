import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import useToggleButtonGroup from '@/hooks/useToggleButtonGroup';

import { getTrending, getPopular } from '@/api/index';
import { Link } from 'react-router-dom';
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
      text: 'This Week',
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
      image: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
      mediaType: item.media_type
    }));
    return mapItems;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        let data;
        if (pageType === 'trending') {
          data = await getTrending({
            mediaType: mediaType.selected.value,
            timeWindow: timeWindow.selected.value
          });
          setGallery(mapCardItems(data.results));
        } else if (pageType === 'popular') {
          data = await getPopular({
            mediaType: mediaType.selected.value
          });
          setGallery(mapCardItems(data.results));
        }
      } catch (error) {
        console.log(
          '🚀 ~ file: TrendingBrowse.jsx:67 ~ getData ~ error',
          error
        );
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [pageType, timeWindow.selected.value, mediaType.selected.value]);

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
            <Link
              to={`/details/${item.mediaType}/${item.id}`}
              className="link"
              key={item.id}
            >
              <Card data={item} />
            </Link>
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
