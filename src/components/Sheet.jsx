import React from 'react';
import PropTypes from 'prop-types';
import '@/styles/sheet.scss';

function Sheet({
  children,
  color,
  variant,
  style,
  height,
  width,
  className,
  pointer,
  onClick
}) {
  const background = {
    plain: 'transparent',
    neutral: `var(--${color}-color)`,
    outlined: `var(--neutral-color)`,
    solid: `var(--${color}-color)`
  };

  const textColor = {
    plain: `var(--${color}-color)`,
    neutral: `var(--${color}-color)`,
    outlined: `var(--${color}-color)`,
    solid: `var(--text-color)`
  };

  const sheetStyle = {
    backgroundColor: background[variant],
    color: textColor[variant],
    width,
    height,
    minWidth: 250,
    minHeight: 200,
    borderColor: `var(--${color}-color)`,
    ...style
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      style={sheetStyle}
      className={`sheet sheet--${variant}${className ? ` ${className}` : ''}${
        pointer ? ` sheet--pointer` : ''
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

Sheet.defaultProps = {
  children: null,
  color: 'neutral',
  variant: 'neutral',
  width: 'auto',
  height: '100%',
  style: {},
  pointer: false,
  onClick: () => {},
  className: ''
};

Sheet.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  color: PropTypes.string,
  variant: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  pointer: PropTypes.bool,
  style: PropTypes.shape({}),
  className: PropTypes.string
};

export default Sheet;
