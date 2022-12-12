/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import '@/styles/modal.scss';

function Modal({ children, open, hide, modalClass, fullscreen }) {
  const handleContentClick = (e) => e.stopPropagation();

  return (
    <div
      className={`modal-wrapper${open ? ' modal-wrapper--active' : ''}${
        modalClass ? ` ${modalClass}` : ''
      }`}
      role="dialog"
      onClick={hide}
    >
      <div
        className={`modal-content${
          fullscreen === true ? ' modal-content--full' : ''
        }`}
        onClick={handleContentClick}
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
  fullscreen: false
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  open: PropTypes.bool,
  hide: PropTypes.func,
  modalClass: PropTypes.string,
  fullscreen: PropTypes.bool
};

export default Modal;
