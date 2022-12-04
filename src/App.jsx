import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Root from '@/layouts/Root';
import Home from '@/pages/Home';
import Details from '@/pages/Details';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route to="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="details" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
