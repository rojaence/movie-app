import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import AppHeader from '@/containers/AppHeader';
import AppFooter from '@/containers/AppFooter';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';

import useModal from '@/hooks/useModal';
import Drawer from '@/components/Drawer';
import Modal from '@/components/Modal';
import SearchBrowse from '@/layouts/SearchBrowse';

function Root() {
  const menuDrawer = useModal();
  const searchDrawer = useModal();

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
    <>
      <AppHeader
        mainMenuActivator={menuDrawer.show}
        searchActivator={searchDrawer.show}
      />
      <main className="main">
        <Outlet />
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
                onClick={onClickItem}
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </Drawer>
        <Modal
          hide={searchDrawer.hide}
          show={searchDrawer.show}
          open={searchDrawer.open}
          fullscreen
        >
          <SearchBrowse
            closeButton={
              <Button
                color="error"
                variant="icon"
                onClick={searchDrawer.hide}
                startIcon={<Icon name="close" size={25} />}
                className="close-button"
              />
            }
          />
        </Modal>
      </main>
      <AppFooter />
    </>
  );
}

export default Root;
