import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '@/containers/AppHeader';
import AppFooter from '@/containers/AppFooter';
import Snackbar from '@/components/Snackbar';
import { SnackbarContext } from '@/context/SnackbarContext';

function Root() {
  const appSnackbar = useContext(SnackbarContext);
  return (
    <>
      <AppHeader />
      <main className="main">
        <Outlet />
      </main>
      {appSnackbar.open && (
        <Snackbar
          message={appSnackbar.message}
          color={appSnackbar.color}
          open={appSnackbar.open}
          onClose={appSnackbar.onClose}
        />
      )}
      {appSnackbar.open}
      <AppFooter />
    </>
  );
}

export default Root;
