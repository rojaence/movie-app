import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import '@/styles/toggleGroup.scss';

function ToggleButtonGroup({ selected, toggle, buttonVariant, items, color }) {
  const activeStyle = {
    backgroundColor: `var(--${color}-color)`,
    color: 'var(--text-color)'
  };
  const inactiveStyle = {
    filter: 'brightness(1)'
  };
  return (
    <div className="toggle-group">
      {items.map((item) => (
        <Button
          text={item}
          key={item}
          variant={buttonVariant}
          onClick={() => toggle(item)}
          color={color}
          style={item === selected ? activeStyle : inactiveStyle}
          className={`toggle-group__item${
            item === selected ? ' toggle-group__item--active' : ''
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
  items: []
};

ToggleButtonGroup.propTypes = {
  selected: PropTypes.string,
  toggle: PropTypes.func,
  buttonVariant: PropTypes.string,
  color: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string)
};

export default ToggleButtonGroup;
