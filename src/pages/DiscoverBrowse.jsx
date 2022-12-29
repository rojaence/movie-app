import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import Card from '@/components/Card';
import CardGalleryItem from '@/components/CardGalleryItem';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import CardGallery from '@/containers/CardGallery';
import CircularProgress from '@/components/CircularProgress';

import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';
import useModal from '@/hooks/useModal';
import Drawer from '@/components/Drawer';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import useToggleButtonGroup from '@/hooks/useToggleButtonGroup';

import ScrollToTop from '@/components/ScrollToTop';

import { discoverMedia, getGenres } from '@/api';
import { mapCardData } from '@/utils';
import { SnackbarContext } from '@/context/SnackbarContext';

import '@/styles/browse.scss';

function DiscoverBrowse({ mediaType }) {
  const [mediaItems, setMediaItems] = useState([]);
  const filterDrawer = useModal();
  const [genres, setGenres] = useState([]);
  const { genreName } = useParams();
  const [selectedGenre, setSelectedGenre] = useState({
    id: '',
    name: 'all'
  });

  const snackbar = useContext(SnackbarContext);

  const pageTitle = {
    movie: 'Movies',
    tv: 'TV Shows'
  };

  const mediaTypeValue = {
    movie: 'movies',
    tv: 'tvshows'
  };

  const orderFilters = {
    tv: [
      {
        text: 'Popularity',
        value: 'popularity.desc'
      },
      {
        text: 'Rating',
        value: 'vote_average.desc'
      },
      {
        text: 'Release date',
        value: 'first_air_date.desc'
      }
    ],
    movie: [
      {
        text: 'Popularity',
        value: 'popularity.desc'
      },
      {
        text: 'Rating',
        value: 'vote_average.desc'
      },
      {
        text: 'Release date',
        value: 'release_date.desc'
      }
    ]
  };

  const toggleSort = useToggleButtonGroup({
    initialItems: orderFilters[mediaType],
    initialSelected: orderFilters[mediaType][0]
  });

  const discoverLazyLoader = useInfinityScroll({
    lazyLoader: discoverMedia,
    urlParams: {
      mediaType,
      genreIdString: '',
      sortBy: orderFilters[mediaType][0].value
    },
    observerOptions: { threshold: 0.5 }
  });

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await getGenres({ mediaType });
        data.unshift({ id: '', name: 'all' });
        const mapData = data.map((item) => {
          const list = item.name.split(' ');
          if (list.length > 1) return { ...item, name: list.join('') };
          return item;
        });
        setGenres(mapData);
        setSelectedGenre(
          data.find(
            (genre) => genre.name.toLowerCase() === genreName.toLowerCase()
          )
        );
      } catch (error) {
        snackbar.show({ message: error.message, color: 'error' });
      }
    };
    loadGenres();
    console.log('carga de géneros');
  }, [mediaType, genreName]);

  useEffect(() => {
    if (selectedGenre) {
      const getMediaByGenre = async () => {
        discoverLazyLoader.setUrlParams({
          mediaType,
          genreIdString: selectedGenre.id,
          sortBy: toggleSort.selected.value
        });
      };
      getMediaByGenre();
      filterDrawer.hide();
    }
    console.log('cambio en selectedGenre o toggleSort');
  }, [selectedGenre, toggleSort.selected]);

  useEffect(() => {
    setMediaItems([...mapCardData(discoverLazyLoader.items)]);
  }, [discoverLazyLoader.items]);

  return (
    <section className="browse container">
      <header className="browse__header">
        <h2 className="browse__title text-capitalize">
          {pageTitle[mediaType]}{' '}
          <span style={{ fontWeight: 'normal' }}>
            / {genreName === 'all' ? 'All genres' : genreName}
          </span>
        </h2>
        <div className="browse__options">
          <div className="sort">
            <span className="sort__label">Sort by:</span>
            <ToggleButtonGroup
              items={toggleSort.items}
              selected={toggleSort.selected}
              toggle={toggleSort.toggle}
              color="info"
            />
          </div>
          <Button
            onClick={filterDrawer.show}
            text="Genres"
            color="info"
            title="Filters"
            className="genres-button"
            startIcon={<Icon name="filters" />}
          />
        </div>
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
                item.name.toLowerCase() === genreName.toLowerCase()
                  ? 'list__item list__item--active'
                  : 'list__item'
              }
              key={item.id}
            >
              <Link
                className="list__link"
                to={`/${mediaTypeValue[mediaType]}/${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </Drawer>
      <ScrollToTop />
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
