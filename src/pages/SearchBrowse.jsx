import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { mapCardData } from '@/utils';
import CardGallery from '@/containers/CardGallery';
import Chip from '@/components/Chip';
import Card from '@/components/Card';
import CardGalleryItem from '@/components/CardGalleryItem';
import Icon from '@/components/icons/Icon';
import CircularProgress from '@/components/CircularProgress';
import '@/styles/browse.scss';

import ScrollToTop from '@/components/ScrollToTop';
import { useTranslation } from 'react-i18next';

import { searchMedia } from '@/api/index';
import useInifinityScroll from '../hooks/useInfinityScroll';

function SearchBrowse() {
  const [mediaItems, setMediaItems] = useState([]);
  const [searchParams] = useSearchParams();

  const { t } = useTranslation();

  const searchLazyLoader = useInifinityScroll({
    lazyLoader: searchMedia,
    urlParams: { query: searchParams.get('query'), mediaType: 'multi' },
    observerOptions: { threshold: 0.5 }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    searchLazyLoader.setUrlParams({
      query: searchParams.get('query'),
      mediaType: 'multi'
    });
  }, [searchParams]);

  useEffect(() => {
    setMediaItems([...mapCardData(searchLazyLoader.items)]);
  }, [searchLazyLoader.items]);

  useEffect(() => {
    window.document.documentElement.style.overflowY = 'scroll';
  }, []);

  return (
    <section className="search container">
      <header className="search__header">
        <div className="total-results">
          <span className="total-results__label">{t('common.total')}:</span>
          <Chip
            text={searchLazyLoader.totalResults.toString()}
            variant="text"
            className="total-results__value"
          />
        </div>
        <div className="query-param">
          <span className="query-param__label">{t('common.resultsFor')}:</span>
          <Chip
            text={searchParams.get('query')}
            variant="text"
            className="query-param__value"
          />
        </div>
      </header>
      <div className="search__body container">
        <CardGallery>
          {mediaItems.map((item) => (
            <CardGalleryItem
              key={item.id}
              ref={searchLazyLoader.setLastElement}
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
        {mediaItems.length === 0 && !searchLazyLoader.loading && (
          <div className="no-results">
            <Icon name="searchOff" size={100} color="accent" />
            <Chip
              text={t('common.noResults')}
              color="accent"
              variant="text"
              style={{ width: 200, fontSize: '1.2em' }}
            />
          </div>
        )}
        {searchLazyLoader.loading && (
          <CircularProgress
            size={60}
            width={7}
            style={{ margin: '5rem auto 0', display: 'block' }}
          />
        )}
      </div>
      <ScrollToTop />
    </section>
  );
}

export default SearchBrowse;
