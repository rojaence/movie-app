/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import '@/styles/modal.scss';

function Modal({ children, open, hide }) {
  const handleContentClick = (e) => e.stopPropagation();

  return (
    <div
      className={`modal-wrapper${open ? ' modal-wrapper--active' : ''}`}
      role="dialog"
      onClick={hide}
    >
      <div className="modal-content" onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );
}

Modal.defaultProps = {
  children: null,
  open: false,
  hide: null
};

Modal.propTypes = {
  children: PropTypes.element,
  open: PropTypes.bool,
  hide: PropTypes.func
};

export default Modal;
