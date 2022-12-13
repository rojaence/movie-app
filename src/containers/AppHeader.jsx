import React, { useEffect } from 'react';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';
import Input from '@/components/Input';
import { Link, useLocation } from 'react-router-dom';

import useModal from '@/hooks/useModal';
import Drawer from '@/components/Drawer';

function AppHeader() {
  const menuDrawer = useModal();
  const searchDrawer = useModal();

  const location = useLocation();

  useEffect(() => {
    menuDrawer.hide();
    searchDrawer.hide();
  }, [location]);

  const mainMenu = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Movies',
      path: '#'
    },
    {
      name: 'Series',
      path: '#'
    },
    {
      name: 'Trending',
      path: 'trending'
    },
    {
      name: 'Most popular',
      path: 'popular'
    }
  ];
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
        variant="outlined"
        text="Search..."
        startIcon={
          <Icon name="search" size={25} color="primary" strokeWidth={1} />
        }
        style={{
          borderRadius: '2rem',
          color: 'rgba(var(--text-color-value), 0.9)'
        }}
        color="info"
        className="elevation-1 search-activator"
        onClick={searchDrawer.show}
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
        <ul className="list text-uppercase">
          {mainMenu.map((item) => (
            <Link
              className="list__item list__item--link"
              to={item.path}
              key={item.name}
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </Drawer>
      <Drawer
        hide={searchDrawer.hide}
        show={searchDrawer.show}
        open={searchDrawer.open}
        anchor="top"
        closeButton={
          <Button
            color="error"
            variant="icon"
            onClick={searchDrawer.hide}
            startIcon={<Icon name="close" size={25} />}
            className="close-button"
          />
        }
      >
        <Input
          placeholder="Search for a movie, TV show..."
          id="search-input"
          variant="filled"
          startIcon={<Icon name="search" />}
          style={{
            maxWidth: '40rem',
            paddingTop: '0.4rem',
            paddingBottom: '0.4rem'
          }}
        />
      </Drawer>
    </header>
  );
}

export default AppHeader;
