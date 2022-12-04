import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/icons/Icon';
import Button from '@/components/Button';
import '@/styles/slideGroup.scss';

function SlideGroup({ items }) {
  const slideList = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);
  const leftButton = useRef(null);
  const rightButton = useRef(null);

  useEffect(() => {
    leftButton.current.style.display = scrollX === 0 ? 'none' : 'block';
    rightButton.current.style.display = scrollEnd ? 'none' : 'block';
  }, [
    scrollX,
    scrollEnd,
    slideList?.current?.offsetWidth,
    slideList?.current?.scrollWidth
  ]);

  const endScrollCheck = () => {
    if (
      Math.floor(
        slideList.current.scrollWidth - slideList.current.scrollLeft
      ) <= slideList.current.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  const scrollShift = (shift) => {
    slideList.current.scrollLeft += shift;
    setScrollX(scrollX + shift);
    endScrollCheck();
  };

  const onScrollEvent = () => {
    setScrollX(slideList.current.scrollLeft);
    endScrollCheck();
  };

  return (
    <div className="slide-group">
      <Button
        startIcon={<Icon name="chevronLeft" size={30} viewBox="0 -4 50 50" />}
        variant="icon"
        color="primary"
        className="button-left"
        ref={leftButton}
        onClick={() => scrollShift(-300)}
      />
      <ul
        className="slide-group__list"
        ref={slideList}
        onScroll={onScrollEvent}
      >
        {items.map((item) => (
          <li className="slide-group__item" key={item.id}>
            {item}
          </li>
        ))}
        {items.length === 0 && 'No data'}
      </ul>
      <Button
        startIcon={<Icon name="chevronRight" size={30} viewBox="-4 -4 50 50" />}
        variant="icon"
        color="primary"
        className="button-right"
        ref={rightButton}
        onClick={() => scrollShift(300)}
      />
    </div>
  );
}

SlideGroup.defaultProps = {
  items: []
};

SlideGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element)
};

export default SlideGroup;
