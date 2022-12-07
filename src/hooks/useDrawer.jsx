import { useState, useEffect, useCallback } from 'react';

const useModal = () => {
  const [open, setOpen] = useState(false);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') setOpen(false);
    },
    [setOpen]
  );

  const hide = () => setOpen(false);

  const show = () => setOpen(true);

  useEffect(() => {
    if (open) {
      document.documentElement.classList.add('scrollbar-none');
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
