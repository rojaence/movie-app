import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Root from '@/layouts/Root';
import Home from '@/pages/Home';
import TrendingBrowse from '@/pages/TrendingBrowse';
import Details from '@/pages/Details';
import SearchBrowse from '@/pages/SearchBrowse';
import DiscoverBrowse from '@/pages/DiscoverBrowse';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route to="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="details/:mediaType/:movieId" element={<Details />} />
          <Route
            path="trending"
            element={<TrendingBrowse pageType="trending" />}
          />
          <Route
            path="popular"
            element={<TrendingBrowse pageType="popular" />}
          />
          <Route path="search/" element={<SearchBrowse />} />
          <Route path="movies" element={<DiscoverBrowse mediaType="movie" />} />
          <Route path="tvshows" element={<DiscoverBrowse mediaType="tv" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
