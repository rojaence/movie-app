import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const CardGalleryItem = forwardRef(({ children }, ref) => (
  <li className="gallery__item" ref={ref}>
    {children}
  </li>
));

CardGalleryItem.defaultProps = {
  children: null
};

CardGalleryItem.propTypes = {
  children: PropTypes.element
};

export default CardGalleryItem;
