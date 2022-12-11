import React from 'react';
import PropTypes from 'prop-types';
import '@/styles/chip.scss';

function Chip({ text, color, variant }) {
  const background = {
    outlined: 'transparent',
    filled:
      color === 'text'
        ? `rgba(var(--${color}-color-value), 0.2)`
        : `rgba(var(--${color}-color-value), 0.8)`
  };
  const chipStyle = {
    backgroundColor: background[variant],
    borderColor:
      variant === 'outlined'
        ? `rgba(var(--${color}-color-value), 0.5)`
        : 'none',
    color: 'var(--text-color)'
  };

  return (
    <div className={`chip chip--${variant}`} style={{ ...chipStyle }}>
      <span className="chip__text">{text}</span>
    </div>
  );
}

Chip.defaultProps = {
  text: '',
  color: 'text',
  variant: 'filled'
};

Chip.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string
};

export default Chip;
