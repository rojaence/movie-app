import React from 'react';
import Icon from '@/components/icons/Icon';
import movieDbIcon from '@/assets/themoviedb.svg';

function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="api-attribution">
        <a
          href="https://www.themoviedb.org/"
          className="api-attribution__link"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={movieDbIcon}
            alt="API Attribution"
            className="api-attribution__image"
          />
        </a>
        <p className="api-attribution__copy">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
      <div className="author">
        <p className="author__name">Coded by Ronny Endara</p>
        <div className="author__social">
          <a
            href="https://www.linkedin.com/in/ronny-endara"
            target="_blank"
            rel="noreferrer"
            className="author__link"
            title="LinkedIn"
          >
            <Icon name="linkedin" size={40} className="author__icon" />
          </a>
          <a
            href="https://www.github.com/rojaence"
            target="_blank"
            rel="noreferrer"
            className="author__link"
            title="Github repo"
          >
            <Icon name="github" size={45} className="author__icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
