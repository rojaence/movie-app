import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import '@/styles/notFound.scss';

function NotFound() {
  return (
    <article className="not-found">
      <h2 className="not-found__title">
        <span className="not-found__title--error">404</span>Page Not Found
      </h2>
      <Link to="/">
        <Button text="Go to Home" />
      </Link>
    </article>
  );
}

export default NotFound;
