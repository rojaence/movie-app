import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@/components/Modal';
import '@/styles/drawer.scss';

function Drawer({
  children,
  anchor,
  open,
  hide,
  show,
  persistent,
  height,
  width,
  wrapperStyle,
  contentStyle,
  contentClass,
  wrapperClass
}) {
  const styleClasses = [
    'drawer',
    `drawer--${anchor}`,
    persistent ? 'drawer--persistent' : '',
    wrapperClass
  ]
    .filter((c) => c !== '')
    .join(' ')
    .trim();
  return (
    <Modal
      open={open}
      hide={hide}
      show={show}
      wrapperStyle={wrapperStyle}
      contentStyle={contentStyle}
      contentClass={contentClass}
      persistent={persistent}
      width={persistent && anchor === 'top' ? '100%' : width}
      height={height}
      modalClass={styleClasses}
    >
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
  persistent: false,
  width: null,
  height: null,
  wrapperStyle: null,
  contentStyle: null,
  contentClass: null,
  wrapperClass: ''
};

Drawer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  anchor: PropTypes.string,
  open: PropTypes.bool,
  hide: PropTypes.func,
  show: PropTypes.func,
  persistent: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  wrapperStyle: PropTypes.shape({}),
  contentStyle: PropTypes.shape({}),
  contentClass: PropTypes.string,
  wrapperClass: PropTypes.string
};

export default Drawer;
