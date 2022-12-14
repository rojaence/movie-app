import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '@/styles/browse.scss';

import { searchMedia } from '@/api/index';

function SearchBrowse() {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { queryParam } = useParams();
  const mediaTypes = ['movie', 'tv'];

  useEffect(() => {
    const search = async (query) => {
      if (query === '') return;
      try {
        const data = await searchMedia({ query });
        setTotalPages(data.total_pages);
        setItems(data.results.filter((r) => mediaTypes.includes(r.media_type)));
        console.log('🚀 ~ file: AppHeader.jsx:39 ~ search ~ data', data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(queryParam);
    search(queryParam);
  }, [queryParam]);

  return (
    <div className="search">
      <header className="search__header">
        <span>Resultados para: {queryParam}</span>
        <span>Páginas totales: {totalPages}</span>
      </header>
      <div className="search__body container">
        <p>Resultados de página 1</p>
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name || item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchBrowse;
