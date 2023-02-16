/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/icons/Icon';
import '@/styles/select.scss';

function Select({
  label,
  items,
  customClass,
  selected,
  onChange,
  onSelected,
  textAlt
}) {
  const [toggleList, setToggleList] = useState(false);
  const handleItemClick = (param) => {
    onChange(param);
    onSelected(param.value);
    setToggleList(false);
  };
  const selectClass = ['select', toggleList && 'select--active', customClass]
    .filter((c) => c !== '')
    .join(' ')
    .trim();
  return (
    <div
      tabIndex={0}
      className={selectClass}
      onBlur={() => setToggleList(false)}
    >
      <div
        className="select__control"
        onClick={() => setToggleList(!toggleList)}
      >
        {label ? (
          <span
            className="select__label"
            onClick={() => setToggleList(!toggleList)}
          >
            {label}:
          </span>
        ) : null}
        <span
          className="select__value"
          onClick={() => setToggleList(!toggleList)}
        >
          {textAlt && selected.textAlt ? selected.textAlt : selected.text}
        </span>
        <div
          className="select__icon"
          onClick={() => setToggleList(!toggleList)}
        >
          <Icon name="chevronDown" />
        </div>
      </div>
      <ul className="select__list elevation-1">
        {items.map((item) => (
          <li
            key={item.value}
            className={`select__item${
              item.value === selected.value ? ' select__item--selected' : ''
            }`}
            onClick={() => handleItemClick(item)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

Select.defaultProps = {
  label: '',
  items: [],
  customClass: '',
  selected: { value: '', text: '', textAlt: '' },
  textAlt: false,
  onChange: () => {},
  onSelected: () => {}
};

Select.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string
    })
  ),
  customClass: PropTypes.string,
  selected: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    textAlt: PropTypes.string
  }),
  textAlt: PropTypes.bool,
  onChange: PropTypes.func,
  onSelected: PropTypes.func
};

export default Select;
