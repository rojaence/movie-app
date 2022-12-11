import { useState } from 'react';

const useToggleButtonGroup = ({
  initialItems = [],
  initialSelected = null
}) => {
  const [items, setItems] = useState(initialItems);
  const [selected, setSelected] = useState(initialSelected);
  const toggle = (value) => setSelected(value);

  return {
    toggle,
    setItems,
    setSelected,
    selected,
    items
  };
};

export default useToggleButtonGroup;
