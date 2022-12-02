import { useState } from 'react';

const useSlideGroup = (initialItems = []) => {
  const [items] = useState(initialItems);
  const scrollLeft = () => {};
  const scrollRight = () => {};

  return { items, scrollLeft, scrollRight };
};

export default useSlideGroup;
