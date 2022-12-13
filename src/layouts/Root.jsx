import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '@/containers/AppHeader';
import AppFooter from '@/containers/AppFooter';

function Root() {
  return (
    <>
      <AppHeader />
      <main className="main">
        <Outlet />
      </main>
      <AppFooter />
    </>
  );
}

export default Root;
