import React from 'react';
import './App.scss';
import AppHeader from '@/containers/AppHeader';
import AppFooter from '@/containers/AppFooter';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';
import Card from '@/components/Card';
import SlideGroup from '@/containers/SlideGroup';

function App() {
  const cardData = {
    title: 'The Expendables 2',
    image:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4EBO8aIeP2bF1jGpwbuRS4CFMca.jpg'
  };

  const cardItems = new Array(10).fill(<Card data={cardData} />);

  const htmlItems = new Array(10).fill(
    <span>Hola mundo {cardData.title}</span>
  );

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
          <Icon name="star" color="accent" size={40} />
          <Icon name="chevronLeft" color="text" />
          <Icon name="chevronRight" color="text" />
        </div>
        <div>
          <h2>Cards</h2>
          <SlideGroup items={cardItems} />
          <SlideGroup items={htmlItems} />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
