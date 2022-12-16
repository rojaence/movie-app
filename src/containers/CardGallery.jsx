import React from 'react';
import PropTypes from 'prop-types';
import '@/styles/cardGallery.scss';

function CardGallery({ children }) {
  return <ul className="gallery">{children}</ul>;
}

CardGallery.defaultProps = {
  children: []
};

CardGallery.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

export default CardGallery;
