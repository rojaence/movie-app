import React from 'react';
import PropTypes from 'prop-types';
import '@/styles/skeleton.scss';

function Skeleton({ width, height, variant, className }) {
  return (
    <div
      className={`skeleton${variant ? ` skeleton--${variant}` : ''}${
        className ? ` ${className}` : ''
      }`}
      style={{ width, height }}
    />
  );
}

Skeleton.defaultProps = {
  width: '100%',
  height: '2rem',
  variant: 'rounded',
  className: ''
};

Skeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.string,
  className: PropTypes.string
};

export default Skeleton;
