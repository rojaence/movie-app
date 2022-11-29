import React from 'react';
import './App.scss';
import AppHeader from '@/containers/AppHeader';
import AppFooter from '@/containers/AppFooter';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className="main">
        <p>Este es el contenido principal</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <h2>Botones</h2>
          <Button text="Botón normal" className="elevation-1" />
          <Button text="Botón rounded" variant="rounded" />
          <Button text="Botón outlined" variant="outlined" />
          <Button text="Botón text" variant="text" />
          <Button
            text="Botón gradient"
            variant="gradient"
            startIcon={<Icon name="search" />}
          />
          <Button text="Start icon" startIcon={<Icon name="search" />} />
          <Button text="End icon" endIcon={<Icon name="close" />} />
          <Button variant="icon" startIcon={<Icon name="search" />} />
          <Button
            variant="icon"
            color="error"
            startIcon={<Icon name="close" />}
          />
        </div>
        <div>
          <h2>Íconos</h2>
          <Icon name="menu" />
          <Icon
            name="github"
            color="info"
            size={40}
            style={{ fill: 'orange' }}
          />
          <Icon name="close" color="error" />
          <Icon name="linkedin" color="primary" />
          <Icon name="search" color="warning" />
        </div>
        <div>
          <h2>Cards</h2>
          Pendiente...
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
