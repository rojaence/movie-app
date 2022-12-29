import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import Root from '@/layouts/Root';
import Home from '@/pages/Home';
import TrendingBrowse from '@/pages/TrendingBrowse';
import Details from '@/pages/Details';
import SearchBrowse from '@/pages/SearchBrowse';
import DiscoverBrowse from '@/pages/DiscoverBrowse';
import PopularBrowse from '@/pages/PopularBrowse';
import NotFound from '@/pages/NotFound';

import { SnackbarProvider } from '@/context/SnackbarContext';
import { getGenres } from '@/api';

function App() {
  return (
    <SnackbarProvider>
      <div className="App">
        <Routes>
          <Route to="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="details/:mediaType/:mediaId" element={<Details />} />
            <Route path="trending" element={<TrendingBrowse />} />
            <Route path="popular" element={<PopularBrowse />} />
            <Route path="search" element={<SearchBrowse />} />
            <Route
              path="movies/:genreName"
              loader={getGenres}
              element={<DiscoverBrowse mediaType="movie" />}
            />
            <Route
              path="movies"
              element={<Navigate to="/movies/all" replace />}
            />
            <Route
              path="tvshows/:genreName"
              element={<DiscoverBrowse mediaType="tv" />}
            />
            <Route
              path="tvshows"
              element={<Navigate to="/tvshows/all" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </SnackbarProvider>
  );
}

export default App;
