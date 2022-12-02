import React from 'react';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';

function AppHeader() {
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
      />
    </header>
  );
}

export default AppHeader;
