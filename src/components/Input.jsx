import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '@/styles/input.scss';

const Input = forwardRef(
  (
    {
      variant,
      type,
      label,
      placeholder,
      onChange,
      id,
      className,
      style,
      startIcon,
      endIcon,
      block
    },
    ref
  ) => {
    const styleClasses = [
      'input',
      variant && `input--${variant}`,
      block ? `input--block` : '',
      className
    ]
      .filter((c) => c !== '')
      .join(' ')
      .trim();
    return (
      <label
        htmlFor={id}
        className={styleClasses}
        style={{ ...style }}
        tabIndex={-1}
      >
        {startIcon && (
          <label htmlFor={id} className="input__start-icon">
            {startIcon}
          </label>
        )}
        <label htmlFor={id} className="input__label">
          {label}
        </label>
        <input
          className="input__field"
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
        />
        {endIcon && (
          <label htmlFor={id} className="input__end-icon">
            {endIcon}
          </label>
        )}
      </label>
    );
  }
);

Input.defaultProps = {
  variant: 'standard',
  type: 'text',
  placeholder: '',
  id: '',
  label: '',
  onChange: null,
  className: '',
  style: {},
  startIcon: null,
  endIcon: null,
  block: false
};

Input.propTypes = {
  variant: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  block: PropTypes.bool
};

export default Input;
