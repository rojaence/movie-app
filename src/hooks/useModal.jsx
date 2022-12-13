import { useState, useEffect, useCallback } from 'react';

const useModal = ({ persistent = false, closeKey = false } = {}) => {
  const [open, setOpen] = useState(false);

  const handleKeyDown = useCallback(
    (e) => {
      if (
        (e.key === 'Escape' && !persistent) ||
        (e.key === 'Escape' && closeKey)
      )
        setOpen(false);
    },
    [setOpen]
  );

  const hide = () => setOpen(false);

  const show = () => setOpen(true);

  useEffect(() => {
    if (open) {
      if (!persistent) document.documentElement.classList.add('scrollbar-none');
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.documentElement.classList.remove('scrollbar-none');
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);
  return {
    open,
    hide,
    show
  };
};

export default useModal;
