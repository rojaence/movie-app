import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const SnackbarContext = createContext({
  open: false,
  message: '',
  onClose: () => {}
});

function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [timerId, setTimerId] = useState(0);

  const [data, setData] = useState({
    message: '',
    delay: 4000,
    color: 'primary'
  });

  let timer;

  const hide = () => {
    clearTimeout(timerId);
    setTimerId(0);
    setOpen(false);
  };

  const show = ({ message = '', delay = 4000, color = 'primary' } = {}) => {
    if (open) {
      hide();
    }
    setData({
      message,
      color,
      delay
    });
    setOpen(true);
    timer = setTimeout(() => {
      hide();
    }, delay);
    setTimerId(timer);
  };

  const value = useMemo(() => ({
    color: data.color,
    message: data.message,
    open,
    show,
    onClose: hide
  }));

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
}

SnackbarProvider.defaultProps = {
  children: null
};

SnackbarProvider.propTypes = {
  children: PropTypes.element
};

export { SnackbarContext, SnackbarProvider };
