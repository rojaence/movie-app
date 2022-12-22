import { useState } from 'react';

const useSnackbar = ({ delay = 4000 } = {}) => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const show = () => {
    if 
  };
  return { open, hide, show };
};

export default useSnackbar;
