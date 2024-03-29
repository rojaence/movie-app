import React, { useEffect, useRef } from 'react';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';
import Input from '@/components/Input';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useModal from '@/hooks/useModal';
import Drawer from '@/components/Drawer';

import Select from '@/components/Select';
import useSelect from '@/hooks/useSelect';

import { useTranslation } from 'react-i18next';

function AppHeader() {
  const menuDrawer = useModal();
  const searchDrawer = useModal({ persistent: true, closeKey: true });
  const searchInput = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const languageOptions = [
    {
      value: 'en',
      text: 'EN - English',
      textAlt: 'EN'
    },
    {
      value: 'es',
      text: 'ES - Español',
      textAlt: 'ES'
    }
  ];

  const selectedLanguage = languageOptions.find(
    (l) => l.value === localStorage.getItem('lng')
  );

  const languageSelector = useSelect(
    languageOptions,
    selectedLanguage || languageOptions[0]
  );

  const changeLanguage = (lng) => {
    if (localStorage.getItem('lng') === lng) return;
    localStorage.setItem('lng', lng);
    window.location.reload();
  };

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

  const navigateToSearch = (queryParam) => {
    navigate({
      pathname: '/search',
      search: `?query=${queryParam}`
    });
  };

  const handleSearch = (e) => {
    if (e.target.value.trim() !== '') navigateToSearch(e.target.value.trim());
  };

  const handleEnterKey = (e) => {
    if (e.target.value.trim() !== '' && e.key === 'Enter')
      navigateToSearch(e.target.value.trim());
  };

  const mainMenu = [
    {
      name: 'home',
      path: '/'
    },
    {
      name: 'movies',
      path: 'movies/all'
    },
    {
      name: 'tv',
      path: 'tv/all'
    },
    {
      name: 'trending',
      path: 'trending'
    },
    {
      name: 'popular',
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
        <img src="movieApp.svg" alt="Logo" className="app-logo" />
        <h1 className="app-title">Movie App</h1>
      </a>
      <Select
        items={languageSelector.items}
        selected={languageSelector.selected}
        onChange={languageSelector.handleOnChange}
        onSelected={changeLanguage}
        outlined
        textAlt
      />
      <Button
        variant="outlined"
        text={`${t('common.search')}...`}
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
            <li className="list__item list__item--link" key={item.name}>
              <Link className="list__link" to={item.path}>
                {t(`page.${item.name}`)}
              </Link>
            </li>
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
        <div className="search-drawer">
          <Button
            color="error"
            variant="icon"
            onClick={searchDrawer.hide}
            startIcon={<Icon name="close" size={25} />}
            className="close-button"
          />
          <Input
            placeholder={t('copy.searchHint')}
            id="search-input"
            variant="filled"
            ref={searchInput}
            className="search-input"
            onChange={handleSearch}
            onKeyDown={handleEnterKey}
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
