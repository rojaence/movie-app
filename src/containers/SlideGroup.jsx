import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/icons/Icon';
import Button from '@/components/Button';
import { useTranslation } from 'react-i18next';
import '@/styles/slideGroup.scss';

function SlideGroup({ items, className }) {
  const slideList = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);
  const leftButton = useRef(null);
  const rightButton = useRef(null);

  const { t } = useTranslation();

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

  useEffect(() => {
    endScrollCheck();
  }, [items]);

  const scrollShift = (direction) => {
    const listRects = slideList.current.getClientRects()[0];
    const listChildren = slideList.current.querySelectorAll('li');
    let reference;
    let value = 0;
    listChildren.forEach((child, index) => {
      const childRects = child.getClientRects()[0];
      if (direction === 'right' && !scrollEnd) {
        if (childRects.right <= listRects.width) {
          reference = listChildren[index + 1];
          value = reference.getClientRects()[0].x - listRects.x;
        }
      } else if (direction === 'left' && scrollX > 0) {
        if (reference && value) return;
        if (childRects.left >= listRects.x) {
          reference = listChildren[index - 1];
          value -= listRects.width - reference.getClientRects()[0].right;
        }
      }
    });
    slideList.current.scrollLeft += value;
    setScrollX(scrollX + value);
    endScrollCheck();
  };

  const onScrollEvent = () => {
    setScrollX(slideList.current.scrollLeft);
    endScrollCheck();
  };

  return (
    <div className={`slide-group${className ? ` ${className}` : ''}`}>
      <Button
        startIcon={<Icon name="chevronLeft" size={30} viewBox="0 -4 50 50" />}
        variant="icon"
        color="primary"
        className="button-left"
        ref={leftButton}
        onClick={() => scrollShift('left')}
      />
      <ul
        className="slide-group__list"
        ref={slideList}
        onScroll={onScrollEvent}
      >
        {items.map((item) => (
          <li className="slide-group__item" key={item.id}>
            {item.element}
          </li>
        ))}
        {items.length === 0 && (
          <li style={{ width: '100%', height: '100%', textAlign: 'center' }}>
            {t('common.noData')}
          </li>
        )}
      </ul>
      <Button
        startIcon={<Icon name="chevronRight" size={30} viewBox="-4 -4 50 50" />}
        variant="icon"
        color="primary"
        className="button-right"
        ref={rightButton}
        onClick={() => scrollShift('right')}
      />
    </div>
  );
}

SlideGroup.defaultProps = {
  items: [],
  className: ''
};

SlideGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      element: PropTypes.element
    })
  ),
  className: PropTypes.string
};

export default SlideGroup;
