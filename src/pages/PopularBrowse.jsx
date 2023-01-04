import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import Card from '@/components/Card';
import useToggleButtonGroup from '@/hooks/useToggleButtonGroup';
import useInfinityScroll from '@/hooks/useInfinityScroll';

import { getPopular } from '@/api/index';
import { mapCardData } from '@/utils/index';
import '@/styles/browse.scss';

import CardGallery from '@/containers/CardGallery';
import CardGalleryItem from '@/components/CardGalleryItem';
import CircularProgress from '@/components/CircularProgress';
import ScrollToTop from '@/components/ScrollToTop';

function PopularBrowse() {
  const [mediaItems, setMediaItems] = useState([]);

  const mediaTypeList = [
    {
      text: 'movies',
      value: 'movie'
    },
    {
      text: 'tv shows',
      value: 'tv'
    },
    {
      text: 'people',
      value: 'person'
    }
  ];

  const mediaType = useToggleButtonGroup({
    initialItems: mediaTypeList,
    initialSelected: mediaTypeList[0]
  });

  const popularLazyLoader = useInfinityScroll({
    lazyLoader: getPopular,
    urlParams: {
      mediaType: mediaType.selected.value
    },
    observerOptions: { threshold: 0.5 }
  });

  useEffect(() => {
    popularLazyLoader.setUrlParams({
      mediaType: mediaType.selected.value
    });
  }, [mediaType.selected.value]);

  useEffect(() => {
    setMediaItems([...mapCardData(popularLazyLoader.items)]);
  }, [popularLazyLoader.items]);

  return (
    <section className="browse container">
      <header className="browse__header">
        <h2 className="browse__title">Popular {mediaType.selected.text}</h2>
        <div className="browse__options">
          <ToggleButtonGroup
            items={mediaType.items}
            selected={mediaType.selected}
            toggle={mediaType.toggle}
            color="primary"
          />
        </div>
      </header>
      <div className="browse__body">
        <CardGallery>
          {mediaItems.map((item) => (
            <CardGalleryItem
              key={item.id}
              ref={popularLazyLoader.setLastElement}
            >
              <Link
                to={`/details/${item.mediaType}/${item.id}`}
                className="link"
              >
                <Card data={item} />
              </Link>
            </CardGalleryItem>
          ))}
        </CardGallery>
      </div>
      {popularLazyLoader.loading && (
        <CircularProgress
          size={60}
          width={7}
          style={{ margin: '5rem auto 0', display: 'block' }}
        />
      )}
      <ScrollToTop />
    </section>
  );
}

export default PopularBrowse;
