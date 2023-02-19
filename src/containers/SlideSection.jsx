import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import SlideGroup from '@/containers/SlideGroup';
import Chip from '@/components/Chip';
import { Link } from 'react-router-dom';
import '@/styles/slideSection.scss';

import { useTranslation } from 'react-i18next';

function SlideSection({ title, slides, link, time }) {
  const { t } = useTranslation();
  return (
    <section className="shelf">
      <header className="shelf__header">
        <h2 className="shelf__title">{title}</h2>
        {time && <Chip text={time} color="info" />}
        {link && (
          <Link to={link} className="shelf__more-link link">
            <Button
              text={t('common.seeMore')}
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
  link: '',
  time: ''
};

SlideSection.propTypes = {
  title: PropTypes.string,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      element: PropTypes.element
    })
  ),
  link: PropTypes.string,
  time: PropTypes.string
};

export default SlideSection;
