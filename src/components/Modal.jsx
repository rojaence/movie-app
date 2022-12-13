/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import '@/styles/modal.scss';

function Modal({
  children,
  open,
  hide,
  modalClass,
  fullscreen,
  persistent,
  width,
  height,
  wrapperStyle,
  contentClass,
  contentStyle
}) {
  const handleContentClick = (e) => e.stopPropagation();
  const handlePersistent = () => !persistent && hide();

  const boxContentStyle = new Map(
    [
      ['width', width],
      ['height', height]
    ].filter((i) => i[1] !== null)
  );

  return (
    <div
      className={`modal-wrapper${open ? ' modal-wrapper--active' : ''}${
        modalClass ? ` ${modalClass}` : ''
      }`}
      role="dialog"
      onClick={handlePersistent}
      style={wrapperStyle}
    >
      <div
        className={`modal-content${
          fullscreen === true ? ' modal-content--full' : ''
        }${contentClass ? ` ${contentClass}` : ''}`}
        onClick={handleContentClick}
        style={{ ...Object.fromEntries(boxContentStyle), ...contentStyle }}
      >
        {children}
      </div>
    </div>
  );
}

Modal.defaultProps = {
  children: null,
  open: false,
  hide: null,
  modalClass: null,
  fullscreen: false,
  persistent: false,
  width: null,
  height: null,
  wrapperStyle: null,
  contentStyle: null,
  contentClass: null
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  open: PropTypes.bool,
  hide: PropTypes.func,
  modalClass: PropTypes.string,
  fullscreen: PropTypes.bool,
  persistent: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrapperStyle: PropTypes.shape({}),
  contentStyle: PropTypes.shape({}),
  contentClass: PropTypes.string
};

export default Modal;
