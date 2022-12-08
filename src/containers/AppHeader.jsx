import React from 'react';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';
import useModal from '@/hooks/useModal';
import Drawer from '@/components/Drawer';

function AppHeader() {
  const menuDrawer = useModal();
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
        onClick={menuDrawer.show}
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
      <Drawer
        hide={menuDrawer.hide}
        show={menuDrawer.show}
        open={menuDrawer.open}
        closeButton={
          <Button
            color="error"
            variant="icon"
            onClick={menuDrawer.hide}
            startIcon={<Icon name="close" size={25} />}
            className="close-button"
          />
        }
      >
        <article>
          <h2>Título del drawer</h2>
          <Button onClick={menuDrawer.hide} text="Cerrar drawer" />
          <p>modal : {menuDrawer.open ? 'true' : 'false'}</p>
        </article>
      </Drawer>
    </header>
  );
}

export default AppHeader;
