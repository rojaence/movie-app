import React from 'react';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';
import useModal from '@/hooks/useModal';
import Drawer from '@/components/Drawer';
import { Link } from 'react-router-dom';

function AppHeader() {
  const menuDrawer = useModal();

  const onClickItem = () => menuDrawer.hide();

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
        <ul className="list">
          {mainMenu.map((item) => (
            <Link
              className="list__item list__item--link"
              to={item.path}
              key={item.name}
              onClick={onClickItem}
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </Drawer>
    </header>
  );
}

export default AppHeader;
