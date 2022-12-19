import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '@/components/Card';
import CardGalleryItem from '@/components/CardGalleryItem';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import CardGallery from '@/containers/CardGallery';
import CircularProgress from '@/components/CircularProgress';

import { discoverMedia } from '@/api';
import { mapCardData } from '@/utils';

import '@/styles/browse.scss';

function DiscoverBrowse() {
  const { mediaType, genre } = useParams();
  const [mediaItems, setMediaItems] = useState([]);
  const discoverLazyLoader = useInfinityScroll({
    lazyLoader: discoverMedia,
    urlParams: { mediaType, genreIdList: [genre] },
    observerOptions: { threshold: 0.5 }
  });

  useEffect(() => {
    discoverLazyLoader.reset();
  }, [mediaType, genre]);

  useEffect(() => {
    setMediaItems([...mapCardData(discoverLazyLoader.items)]);
  }, [discoverLazyLoader.items]);

  return (
    <section className="browse">
      <header className="browse__header">
        <h2 className="browse__title text-capitalize">{genre}</h2>
      </header>
      <div className="browse__body container">
        <CardGallery>
          {mediaItems.map((item) => (
            <CardGalleryItem
              key={item.id}
              ref={discoverLazyLoader.setLastElement}
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
        {discoverLazyLoader.loading && (
          <CircularProgress
            size={60}
            width={7}
            style={{ margin: '5rem auto 0', display: 'block' }}
          />
        )}
      </div>
    </section>
  );
}

export default DiscoverBrowse;
