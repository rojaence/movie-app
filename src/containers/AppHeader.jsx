import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';

function AppHeader({ searchActivator, mainMenuActivator }) {
  return (
    <header className="app-header elevation-1">
      <Button
        variant="icon"
        startIcon={<Icon name="menu" size={28} />}
        style={{
          height: '45px',
          width: '45px',
          backgroundColor: 'transparent'
        }}
        className="menu-button"
        onClick={() => mainMenuActivator()}
      />
      <a className="app-bar-title" href="/">
        <img src="movieapp.svg" alt="Logo" className="app-logo" />
        <h1 className="app-title">Movie App</h1>
      </a>
      <Button
        variant="icon"
        startIcon={<Icon name="search" size={25} />}
        style={{
          height: '45px',
          width: '45px'
        }}
        className="elevation-1"
        onClick={searchActivator}
      />
    </header>
  );
}

AppHeader.defaultProps = {
  searchActivator: null,
  mainMenuActivator: null
};

AppHeader.propTypes = {
  searchActivator: PropTypes.func,
  mainMenuActivator: PropTypes.func
};

export default AppHeader;
