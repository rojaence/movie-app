import React from 'react';
import PropTypes from 'prop-types';
import '@/styles/button.scss';

function Button({
  color,
  variant,
  text,
  onClick,
  style,
  startIcon,
  endIcon,
  className
}) {
  const stylesClasses = [
    'button',
    `button--${color}`,
    variant && `button--${variant}`,
    className
  ]
    .filter((c) => c !== '')
    .join(' ')
    .trim();
  const variantClasses = ['text', 'outlined', 'icon'];
  const buttonStyle = {
    color: variantClasses.includes(variant)
      ? `var(--${color}-color)`
      : `var(--text-color)`,
    borderColor: variant === 'outlined' ? `var(--${color}-color)` : 'none',
    backgroundColor: !variantClasses.includes(variant)
      ? `var(--${color}-color)`
      : `rgba(var(--${color}-color-value), 0.1)`,
    ...style
  };
  return (
    <button
      className={stylesClasses}
      style={buttonStyle}
      onClick={onClick}
      type="button"
    >
      {startIcon}
      {text && <span className="button__text">{text}</span>}
      {endIcon}
    </button>
  );
}

Button.defaultProps = {
  color: 'primary',
  variant: '',
  text: '',
  onClick: null,
  startIcon: null,
  endIcon: null,
  className: '',
  style: {}
};

Button.propTypes = {
  color: PropTypes.string,
  variant: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  className: PropTypes.string,
  style: PropTypes.shape({})
};

export default Button;
