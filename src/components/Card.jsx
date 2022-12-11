import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '@/styles/card.scss';

const Card = forwardRef(({ data }, ref) => (
  <article className="card" title={data.title} ref={ref}>
    <h2 className="card__title">{data.title}</h2>
    <img className="card__image" src={data.image} alt="Banner" />
  </article>
));

Card.defaultProps = {
  data: {
    title: 'No data',
    image: ''
  }
};

Card.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string
  })
};

export default Card;
