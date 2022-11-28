import React from 'react';
import './App.scss';
import AppHeader from '@/containers/AppHeader';
import AppFooter from '@/containers/AppFooter';
import Button from '@/components/Button';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className="main">
        Este es el contenido principal
        <Button text="Botón normal" variant="rounded" />
        <Button text="Botón outlined" variant="outlined" />
        <Button text="Botón text" variant="text" />
        <Button text="Botón gradient" variant="gradient" />
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
