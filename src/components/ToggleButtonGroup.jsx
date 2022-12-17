import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import '@/styles/toggleGroup.scss';

function ToggleButtonGroup({ selected, toggle, items, color, className }) {
  const activeStyle = {
    backgroundColor:
      color === 'text'
        ? `rgba(var(--${color}-color-value), 0.15)`
        : `rgba(var(--${color}-color-value), 0.5)`,
    color: 'var(--text-color)'
  };
  const inactiveStyle = {
    filter: 'brightness(1)',
    backgroundColor: 'transparent',
    color: 'var(--text-color)'
  };
  return (
    <div className={`toggle-group${className ? ` ${className}` : ''}`}>
      {items.map((item) => (
        <Button
          text={item.text}
          key={item.text}
          variant="outlined"
          onClick={() => toggle(item)}
          color={color}
          style={item.value === selected.value ? activeStyle : inactiveStyle}
          className={`toggle-group__item${
            item.value === selected.value ? ' toggle-group__item--active' : ''
          }`}
        />
      ))}
    </div>
  );
}

ToggleButtonGroup.defaultProps = {
  selected: null,
  toggle: null,
  color: 'primary',
  items: [],
  className: ''
};

ToggleButtonGroup.propTypes = {
  selected: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string
  }),
  toggle: PropTypes.func,
  color: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string
    })
  ),
  className: PropTypes.string
};

export default ToggleButtonGroup;
