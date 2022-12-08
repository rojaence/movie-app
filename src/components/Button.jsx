import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '@/styles/button.scss';

const Button = forwardRef(
  (
    {
      color,
      variant,
      text,
      onClick,
      style,
      startIcon,
      endIcon,
      className,
      title
    },
    ref
  ) => {
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
    const variantClassesAlpha = {
      text: '0.1',
      outlined: '0.1',
      icon: '.3'
    };
    const buttonStyle = {
      color: variantClasses.includes(variant)
        ? `var(--${color}-color)`
        : `var(--text-color)`,
      borderColor: variant === 'outlined' ? `var(--${color}-color)` : 'none',
      backgroundColor: !variantClasses.includes(variant)
        ? `var(--${color}-color)`
        : `rgba(var(--${color}-color-value), ${variantClassesAlpha[variant]})`,
      ...style
    };
    return (
      <button
        className={stylesClasses}
        style={buttonStyle}
        onClick={onClick}
        ref={ref}
        type="button"
        title={title}
      >
        {startIcon}
        {text && <span className="button__text">{text}</span>}
        {endIcon}
      </button>
    );
  }
);

Button.defaultProps = {
  color: 'primary',
  variant: '',
  text: '',
  onClick: null,
  startIcon: null,
  endIcon: null,
  className: '',
  title: '',
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
  title: PropTypes.string,
  style: PropTypes.shape({})
};

export default Button;
