import React, { useEffect, useRef } from 'react';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';
import Input from '@/components/Input';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useModal from '@/hooks/useModal';
import Drawer from '@/components/Drawer';

function AppHeader() {
  const menuDrawer = useModal();
  const searchDrawer = useModal({ persistent: true, closeKey: true });
  const searchInput = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    menuDrawer.hide();
    if (!location.pathname.includes('search')) searchDrawer.hide();
  }, [location]);

  useEffect(() => {
    if (!location.pathname.includes('search')) searchInput.current.value = '';
  }, [searchDrawer.open]);

  useEffect(() => {
    if (searchDrawer.open) {
      searchInput.current.focus();
      window.scrollTo(0, 0);
    }
  }, [searchDrawer.open]);

  const handleSearch = (e) => {
    if (e.target.value.trim() !== '')
      navigate({
        pathname: '/search',
        search: `?query=${e.target.value.trim()}`
      });
  };

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
      >
        <Button
          color="error"
          variant="icon"
          onClick={menuDrawer.hide}
          startIcon={<Icon name="close" size={25} />}
          className="close-button"
        />
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
        wrapperStyle={{
          backgroundColor: 'transparent !important'
        }}
        contentStyle={{
          backgroundColor: 'rgba(var(--secondary-color-alt-value), 1)',
          backdropFilter: 'blur(0)'
        }}
        wrapperClass="elevation-1"
        persistent
        height={80}
      >
        <div className="search-drawer container">
          <Button
            color="error"
            variant="icon"
            onClick={searchDrawer.hide}
            startIcon={<Icon name="close" size={25} />}
            className="close-button"
          />
          <Input
            placeholder="Search for a movie, TV show..."
            id="search-input"
            variant="filled"
            ref={searchInput}
            className="search-input"
            onChange={handleSearch}
            startIcon={<Icon name="search" />}
            style={{
              maxWidth: '40rem',
              paddingTop: '0.4rem',
              paddingBottom: '0.4rem'
            }}
          />
        </div>
      </Drawer>
    </header>
  );
}

export default AppHeader;
