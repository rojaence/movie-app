import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { mapCardData, removeDuplicateId } from '@/utils';
import CardGallery from '@/containers/CardGallery';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import useToggleButtonGroup from '@/hooks/useToggleButtonGroup';
import Chip from '@/components/Chip';
import Card from '@/components/Card';
import CardGalleryItem from '@/components/CardGalleryItem';
import '@/styles/browse.scss';

import { searchMedia } from '@/api/index';

function SearchBrowse() {
  const [mediaItems, setMediaItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [lastElement, setLastElement] = useState(null);
  const [queryParam, setQueryParam] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setCurrentPage((value) => value + 1);
        }
      },
      { threshold: 0.5 }
    )
  );

  const mediaTypeList = [
    {
      text: 'all',
      value: 'multi'
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

  const search = async (query) => {
    if (!query || currentPage > totalPages) return;
    // mediaType.setSelected(mediaType.items[0]);
    try {
      setLoading(true);
      const data = await searchMedia({
        query,
        mediaType: mediaType.selected.value,
        page: currentPage
      });
      setTotalPages(data.total_pages);
      let results = [];
      if (mediaType.selected.value === 'multi') {
        results = data.results.filter(
          (r) => r.media_type === 'movie' || r.media_type === 'tv'
        );
      } else {
        // Adding missing parameter media_type
        results = data.results.map((result) => ({
          ...result,
          media_type: mediaType.selected.value
        }));
      }
      setTotalResults(results.length);
      let allData = [];
      if (currentPage === 1) {
        allData = mapCardData(results);
      } else {
        allData = [...mediaItems, ...mapCardData(results)];
      }
      const newData = removeDuplicateId(allData);
      setMediaItems(newData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // setQueryParam(searchParams.get('query'));
    // search(searchParams.get('query'));
    search(queryParam);
  }, [currentPage]);

  useEffect(() => {
    setQueryParam(searchParams.get('query'));
    setTotalPages(1);
    setCurrentPage(1);
    window.scrollTo(0, 0);
    search(queryParam);
  }, [searchParams]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  useEffect(() => {
    if ((searchParams.get('query') || queryParam) && mediaItems.length === 0) {
      search(searchParams.get('query'));
    }
  }, [location]);

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
        <CardGallery>
          {mediaItems.map((item) => (
            <CardGalleryItem key={item.id} ref={setLastElement}>
              <Link
                to={`/details/${item.mediaType}/${item.id}`}
                className="link"
              >
                <Card data={item} />
              </Link>
            </CardGalleryItem>
          ))}
        </CardGallery>
        {currentPage >= totalPages && (
          <div className="end-results">
            <Chip
              text={`${
                mediaItems.length === 0 ? 'No results' : 'No more results'
              }`}
              color="info"
              style={{ width: 200, margin: '4rem auto 0', fontSize: '1.2em' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBrowse;
