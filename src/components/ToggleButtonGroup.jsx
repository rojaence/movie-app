import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import '@/styles/toggleGroup.scss';

function ToggleButtonGroup({
  selected,
  toggle,
  buttonVariant,
  items,
  color,
  className
}) {
  const activeStyle = {
    backgroundColor: `var(--${color}-color)`,
    color: 'var(--text-color)'
  };
  const inactiveStyle = {
    filter: 'brightness(1)'
  };
  return (
    <div className={`toggle-group${className ? ` ${className}` : ''}`}>
      {items.map((item) => (
        <Button
          text={item.text}
          key={item.text}
          variant={buttonVariant}
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
  buttonVariant: 'text',
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
  buttonVariant: PropTypes.string,
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
