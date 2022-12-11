import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import useToggleButtonGroup from '@/hooks/useToggleButtonGroup';
import '@/styles/browse.scss';

function Browse({ pageType }) {
  const pageTitle = {
    trending: 'Trending',
    popular: 'Most popular'
  };
  const [mediaType, setMediaType] = useState(null);

  const mediaTypeToggle = useToggleButtonGroup({
    initialItems: ['movies', 'tv'],
    initialSelected: 'movies'
  });

  useEffect(() => {
    setMediaType(mediaTypeToggle.selected);
  }, [mediaTypeToggle]);

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
      <div className="browse__body">Aquí la galería de items {mediaType}</div>
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
