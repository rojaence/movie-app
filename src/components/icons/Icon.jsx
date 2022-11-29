import React from 'react';
import PropTypes from 'prop-types';
import iconPath from '@/components/icons/iconsLib';

function Icon({ size, color, name, className, style, viewBox }) {
  return (
    <svg
      className={`icon ${className}`}
      style={style}
      viewBox={viewBox}
      height={`${size}px`}
      width={`${size}px`}
    >
      <path fill={`var(--${color}-color)`} d={iconPath[name]} />
    </svg>
  );
}

Icon.defaultProps = {
  size: 20,
  color: 'text',
  viewBox: '0 0 50 50',
  style: {},
  className: ''
};

Icon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  viewBox: PropTypes.string,
  name: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  className: PropTypes.string
};

export default Icon;
