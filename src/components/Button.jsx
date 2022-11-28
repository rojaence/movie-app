import React from 'react';
import PropTypes from 'prop-types';
import '@/styles/button.scss';

function Button({ color, variant, text }) {
  const variantClasses = ['text', 'outlined'];
  const buttonStyle = {
    color: variantClasses.includes(variant)
      ? `var(--${color}-color)`
      : `var(--text-color)`,
    borderColor: variant === 'outlined' ? `var(--${color}-color)` : 'none',
    backgroundColor: !variantClasses.includes(variant)
      ? `var(--${color}-color)`
      : `rgba(var(--${color}-color-value), 0.1)`
  };
  return (
    <button
      className={`button button--${color} ${variant && `button--${variant}`}`}
      style={buttonStyle}
      type="button"
    >
      <span className="button__text">{text}</span>
    </button>
  );
}

Button.defaultProps = {
  color: 'primary',
  variant: '',
  text: ''
};

Button.propTypes = {
  color: PropTypes.string,
  variant: PropTypes.string,
  text: PropTypes.string
};

export default Button;
