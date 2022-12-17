import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/icons/Icon';
import Chip from '@/components/Chip';
import '@/styles/card.scss';

const Card = forwardRef(({ data }, ref) => {
  const chipColor = {
    movie: 'primary',
    tv: 'warning',
    person: 'success'
  };
  return (
    <article className="card" title={data.title} ref={ref}>
      <h2 className="card__title">{data.title}</h2>
      <div
        className={
          data.image ? 'card__banner' : 'card__banner card__banner--null'
        }
      >
        {data.image ? (
          <img className="card__image" src={data.image} alt="Banner" />
        ) : (
          <Icon
            name="image"
            size={150}
            className="card__image-alt"
            viewBox="-1 0 50 50"
          />
        )}
        <Chip
          text={data.mediaType}
          color={chipColor[data.mediaType]}
          style={{ opacity: 0.9, fontWeight: 500, fontSize: '0.8em' }}
          className="card__media-type"
        />
      </div>
    </article>
  );
});

Card.defaultProps = {
  data: {
    title: 'No data',
    image: '',
    mediaType: ''
  }
};

Card.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    mediaType: PropTypes.string
  })
};

export default Card;
