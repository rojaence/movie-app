import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import mapCardData from '@/utils';
import CardGallery from '@/containers/CardGallery';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import useToggleButtonGroup from '@/hooks/useToggleButtonGroup';
import Chip from '@/components/Chip';
import '@/styles/browse.scss';

import { searchMedia } from '@/api/index';

function SearchBrowse() {
  const [mediaItems, setMediaItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [queryParam, setQueryParam] = useState('');
  const mediaTypes = ['movie', 'tv'];

  const [searchParams, setSearchParams] = useSearchParams();

  const mediaTypeList = [
    {
      text: 'all',
      value: 'all'
    },
    {
      text: 'movies',
      value: 'movie'
    },
    {
      text: 'tv shows',
      value: 'tv'
    }
  ];

  const mediaType = useToggleButtonGroup({
    initialItems: mediaTypeList,
    initialSelected: mediaTypeList[0]
  });

  useEffect(() => {
    const search = async (query) => {
      if (!query) return;
      try {
        const data = await searchMedia({ query });
        console.log('🚀 ~ file: SearchBrowse.jsx:45 ~ search ~ data', data);
        setTotalPages(data.total_pages);
        const results = data.results.filter((r) =>
          mediaTypes.includes(r.media_type)
        );
        setTotalResults(results.length);
        setMediaItems(mapCardData(results));
      } catch (error) {
        console.log(error);
      }
    };
    setQueryParam(searchParams.get('query'));
    search(searchParams.get('query'));
  }, [searchParams]);

  return (
    <div className="search">
      <header className="search__header container">
        <ToggleButtonGroup
          items={mediaType.items}
          selected={mediaType.selected}
          toggle={mediaType.toggle}
          color="primary"
          buttonVariant="outlined"
          className="toggle-media"
        />
        <div className="query-param">
          <span className="query-param__label">Results for:</span>
          <Chip
            text={queryParam}
            variant="text"
            className="query-param__value"
          />
        </div>
      </header>
      <div className="search__body container">
        <CardGallery items={mediaItems} />
      </div>
    </div>
  );
}

export default SearchBrowse;
