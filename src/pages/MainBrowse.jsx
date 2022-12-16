import React, { useState, useEffect, useRef } from 'react';
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
  const [mediaType, setMediaType] = useState('movie');
  const [page, setPage] = useState(1);
  const [limitPage, setLimitPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lastElement, setLastElement] = useState(null);
  const [gallery, setGallery] = useState([]);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPage((value) => value + 1);
      }
    })
  );

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

  const mediaTypeToggle = useToggleButtonGroup({
    initialItems: mediaTypeList,
    initialSelected: mediaTypeList[0]
  });

  /* useEffect(() => {
    if (mediaType !== mediaTypeToggle.selected.value) {
      setMediaType(mediaTypeToggle.selected.value);
      setGallery([]);
      setLimitPage(1);
      setLastElement(null);
      setPage(1);
      console.log('reset');
    }
  }, [mediaTypeToggle.selected]); */

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
    setLimitPage(data.total_pages);
    return data.results;
  };

  const getPopularItems = async (params = {}) => {
    const data = await getPopular(params);
    setLimitPage(data.total_pages);
    return data.results;
  };

  useEffect(() => {
    console.log('cambió page');
    console.log(page);

    if (loading) return;
    if (page <= limitPage) {
      setLoading(true);
      if (pageType === 'trending') {
        getTrendingItems({ mediaType, page }).then((data) => {
          const newData = new Set([...gallery, ...mapCardItems(data)]);
          console.log(
            '🚀 ~ file: TrendingBrowse.jsx:87 ~ getTrendingItems ~ newData',
            newData
          );
          setGallery([...newData]);
          setLoading(false);
        });
      } else if (pageType === 'popular') {
        getPopularItems({ mediaType, page }).then((data) => {
          const newData = new Set([...gallery, ...mapCardItems(data)]);
          setGallery([...newData]);
          setLoading(false);
        });
      }
    }
  }, [page]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <section className="browse container">
      <header className="browse__header">
        <h2 className="browse__title">{pageTitle[pageType]}</h2>
        <ToggleButtonGroup
          items={mediaTypeToggle.items}
          selected={mediaTypeToggle.selected}
          toggle={mediaTypeToggle.toggle}
          color="primary"
          buttonVariant="outlined"
        />
      </header>
      <div className="browse__body">
        <div className="gallery">
          {gallery.map((item) => (
            <Card
              data={item}
              key={`${item.id}-${item.title || item.name}`}
              ref={setLastElement}
            />
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
