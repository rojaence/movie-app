import React from 'react';
import PropTypes from 'prop-types';

function CircularProgress({ size, color, style, width }) {
  const loaderStyle = {
    border: `${width}px solid var(--${color}-color)`,
    width: size,
    height: size,
    ...style
  };
  return <div className="circular-progress" style={loaderStyle} />;
}

CircularProgress.defaultProps = {
  size: 48,
  color: 'primary',
  style: {},
  width: 5
};

CircularProgress.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.shape({}),
  width: PropTypes.number
};

export default CircularProgress;
