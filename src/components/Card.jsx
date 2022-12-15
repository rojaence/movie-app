import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/icons/Icon';
import '@/styles/card.scss';

const Card = forwardRef(({ data }, ref) => (
  <article className="card" title={data.title} ref={ref}>
    <h2 className="card__title">{data.title}</h2>
    {data.image ? (
      <img className="card__image" src={data.image} alt="Banner" />
    ) : (
      <div className="card__image card__image--null">
        <Icon name="image" size={150} />
      </div>
    )}
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
