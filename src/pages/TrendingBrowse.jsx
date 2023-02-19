import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import Card from '@/components/Card';
import useToggleButtonGroup from '@/hooks/useToggleButtonGroup';

import { getTrending } from '@/api/index';
import { mapCardData } from '@/utils/index';
import { SnackbarContext } from '@/context/SnackbarContext';
import '@/styles/browse.scss';

import CardGallery from '@/containers/CardGallery';
import CardGalleryItem from '@/components/CardGalleryItem';
import CircularProgress from '@/components/CircularProgress';
import ScrollToTop from '@/components/ScrollToTop';

import { useTranslation } from 'react-i18next';

function Browse() {
  const snackbar = useContext(SnackbarContext);
  const [loading, setLoading] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);

  const { t } = useTranslation();

  const mediaTypeList = [
    {
      text: t('common.movies'),
      value: 'movie'
    },
    {
      text: t('common.tv'),
      value: 'tv'
    }
  ];

  const timeWindowList = [
    {
      text: t('common.today'),
      value: 'day'
    },
    {
      text: t('common.thisWeek'),
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

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await getTrending({
          mediaType: mediaType.selected.value,
          timeWindow: timeWindow.selected.value
        });
        setMediaItems(mapCardData(data.results));
      } catch (error) {
        snackbar.show({ message: error.message, color: 'error' });
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [timeWindow.selected.value, mediaType.selected.value]);

  return (
    <section className="browse container">
      <header className="browse__header">
        <h2 className="browse__title">{t('title.trending')}</h2>
        <div className="browse__options">
          <ToggleButtonGroup
            items={timeWindow.items}
            selected={timeWindow.selected}
            toggle={timeWindow.toggle}
            color="info"
          />
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
            <CardGalleryItem key={item.id}>
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
      {loading && (
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

export default Browse;
