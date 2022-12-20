import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@/components/Card';
import CardGalleryItem from '@/components/CardGalleryItem';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import CardGallery from '@/containers/CardGallery';
import CircularProgress from '@/components/CircularProgress';

import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';
import useModal from '@/hooks/useModal';
import Drawer from '@/components/Drawer';

import { discoverMedia, getGenres } from '@/api';
import { mapCardData } from '@/utils';

import '@/styles/browse.scss';

function DiscoverBrowse({ mediaType }) {
  const [mediaItems, setMediaItems] = useState([]);
  const filterDrawer = useModal();
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState({ id: 0, name: '' });

  const discoverLazyLoader = useInfinityScroll({
    lazyLoader: discoverMedia,
    urlParams: {
      mediaType,
      genreIdString: selectedGenre.id
    },
    observerOptions: { threshold: 0.5 }
  });

  const pageTitle = {
    movie: 'Movies',
    tv: 'TV Shows'
  };

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await getGenres({ mediaType });
        setGenres(data);
        setSelectedGenre(data[0]);
      } catch (error) {
        console.log(
          '🚀 ~ file: DiscoverBrowse.jsx:48 ~ loadData ~ error',
          error
        );
      }
    };
    loadGenres();
  }, [mediaType]);

  useEffect(() => {
    const getMediaByGenre = async () => {
      discoverLazyLoader.setUrlParams({
        mediaType,
        genreIdString: selectedGenre.id
      });
    };
    getMediaByGenre();
    filterDrawer.hide();
  }, [selectedGenre]);

  useEffect(() => {
    setMediaItems([...mapCardData(discoverLazyLoader.items)]);
  }, [discoverLazyLoader.items]);

  return (
    <section className="browse">
      <header className="browse__header container">
        <h2 className="browse__title text-capitalize">
          {pageTitle[mediaType]}{' '}
          <span style={{ fontWeight: 'normal' }}>/ {selectedGenre.name}</span>
        </h2>
        <Button
          onClick={filterDrawer.show}
          text="Genres"
          color="info"
          title="Filters"
          startIcon={<Icon name="filters" />}
        />
      </header>
      <div className="browse__body container">
        <CardGallery>
          {mediaItems.map((item) => (
            <CardGalleryItem
              key={item.id}
              ref={discoverLazyLoader.setLastElement}
            >
              <Link to={`/details/${mediaType}/${item.id}`} className="link">
                <Card data={{ ...item, mediaType }} />
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
      <Drawer
        hide={filterDrawer.hide}
        show={filterDrawer.show}
        open={filterDrawer.open}
        anchor="right"
      >
        <Button
          color="error"
          variant="icon"
          onClick={filterDrawer.hide}
          startIcon={<Icon name="close" size={25} />}
          className="close-button"
        />
        <ul className="list text-uppercase">
          {genres.map((item) => (
            <li
              className={
                item.id === selectedGenre.id
                  ? 'list__item list__item--active'
                  : 'list__item'
              }
              key={item.id}
            >
              <Button
                text={item.name}
                onClick={() => setSelectedGenre(item)}
                variant="plain"
                className="list__link"
              />
            </li>
          ))}
        </ul>
      </Drawer>
    </section>
  );
}

DiscoverBrowse.defaultProps = {
  mediaType: 'movie'
};

DiscoverBrowse.propTypes = {
  mediaType: PropTypes.string
};
export default DiscoverBrowse;
