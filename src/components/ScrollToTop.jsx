import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';

function ScrollToTop({ color, size, className, style }) {
  const [show, setShow] = useState(false);

  const scrollTopStyle = {
    animation: 'growIn 0.2s',
    position: 'fixed',
    bottom: '2rem',
    right: '1rem',
    borderRadius: '50%'
  };

  useEffect(() => {
    const handleVisibility = () => {
      setShow(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleVisibility);
    return () => {
      window.removeEventListener('scroll', handleVisibility);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={className}
      style={{ ...scrollTopStyle, ...style, display: show ? 'block' : 'none' }}
    >
      <Button
        color={color}
        startIcon={<Icon name="arrowUp" size={Math.floor(size * 0.6)} />}
        className="elevation-2"
        title="Scroll to top"
        onClick={handleScrollTop}
        style={{
          height: size,
          width: size,
          borderRadius: '50%'
        }}
      />
    </div>
  );
}

ScrollToTop.defaultProps = {
  color: 'primary',
  size: 50,
  className: null,
  style: {}
};

ScrollToTop.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape({})
};

export default ScrollToTop;
