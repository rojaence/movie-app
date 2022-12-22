import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';
import '@/styles/snackbar.scss';

function Snackbar({ message, color, open, onClose }) {
  const snackbarStyle = {
    backgroundColor: `var(--${color}-color)`
  };

  return (
    <div
      className={
        open ? 'snackbar snackbar--active elevation-3' : 'snackbar elevation-3'
      }
      style={snackbarStyle}
    >
      <p className="snackbar__message">{message}</p>
      <Button
        variant="icon"
        startIcon={<Icon name="close" />}
        className="snackbar__close-btn"
        onClick={onClose}
      />
    </div>
  );
}

Snackbar.defaultProps = {
  message: '',
  color: 'primary',
  open: false,
  onClose: () => {}
};

Snackbar.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default Snackbar;
