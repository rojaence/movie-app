import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import { useTranslation } from 'react-i18next';
import '@/styles/notFound.scss';

function NotFound() {
  const { t } = useTranslation();
  return (
    <article className="not-found">
      <h2 className="not-found__title">
        <span className="not-found__title--error">404</span>
        <span className="not-found__title--message">
          {t('copy.pageNotFound')}
        </span>
      </h2>
      <Link to="/" className="link">
        <Button text={t('copy.goToHome')} />
      </Link>
    </article>
  );
}

export default NotFound;
