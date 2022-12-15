import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@/components/Card';
import '@/styles/cardGallery.scss';

function CardGallery({ items }) {
  return (
    <ul className="gallery">
      {items.map((item) => (
        <li className="gallery__item" key={item.id}>
          <Link
            to={`/details/${item.mediaType}/${item.id}`}
            className="link"
            key={item.id}
          >
            <Card data={item} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

CardGallery.defaultProps = {
  items: []
};

CardGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string
    })
  )
};

export default CardGallery;
