import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import SlideGroup from '@/containers/SlideGroup';

function SlideSection({ title, slides, link }) {
  return (
    <section className="shelf">
      <header className="shelf__header">
        <h2 className="shelf__title">{title}</h2>
        <Button
          text={`See more${link}`}
          className="shelf__more-button"
          color="primary"
          variant="rounded"
        />
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
