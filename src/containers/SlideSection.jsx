import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import SlideGroup from '@/containers/SlideGroup';
import { Link } from 'react-router-dom';

function SlideSection({ title, slides, link }) {
  return (
    <section className="shelf">
      <header className="shelf__header">
        <h2 className="shelf__title">{title}</h2>
        {link && (
          <Link to={link}>
            <Button
              text="See more"
              className="shelf__more-button"
              color="primary"
              variant="rounded"
            />
          </Link>
        )}
      </header>
      <SlideGroup items={slides} />
    </section>
  );
}

SlideSection.defaultProps = {
  title: '',
  slides: [],
  link: ''
};

SlideSection.propTypes = {
  title: PropTypes.string,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      element: PropTypes.element
    })
  ),
  link: PropTypes.string
};

export default SlideSection;
