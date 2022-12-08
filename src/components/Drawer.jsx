import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@/components/Modal';
import '@/styles/drawer.scss';

function Drawer({ children, anchor, open, hide, show, closeButton }) {
  return (
    <Modal
      open={open}
      hide={hide}
      show={show}
      modalClass={`drawer drawer--${anchor}`}
    >
      {closeButton && <div className="drawer__header">{closeButton}</div>}
      {children}
    </Modal>
  );
}

Drawer.defaultProps = {
  children: null,
  anchor: 'left',
  open: false,
  hide: null,
  show: null,
  closeButton: null
};

Drawer.propTypes = {
  children: PropTypes.element,
  anchor: PropTypes.string,
  open: PropTypes.bool,
  hide: PropTypes.func,
  show: PropTypes.func,
  closeButton: PropTypes.element
};

export default Drawer;
