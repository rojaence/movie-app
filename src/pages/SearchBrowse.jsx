import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { mapCardData, removeDuplicateId } from '@/utils';
import CardGallery from '@/containers/CardGallery';
import Chip from '@/components/Chip';
import Card from '@/components/Card';
import CardGalleryItem from '@/components/CardGalleryItem';
import Icon from '@/components/icons/Icon';
import '@/styles/browse.scss';

import { searchMedia } from '@/api/index';

function SearchBrowse() {
  const [mediaItems, setMediaItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [lastElement, setLastElement] = useState(null);

  const [searchParams] = useSearchParams();
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

  const search = async () => {
    const query = searchParams.get('query');
    if (!query || currentPage > totalPages) return;
    try {
      setLoading(true);
      const data = await searchMedia({
        query,
        mediaType: 'multi',
        page: currentPage
      });
      setTotalPages(data.total_pages);
      const results = [...data.results];
      setTotalResults(data.total_results);
      console.log('query', query);
      console.log(data);
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
    search();
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTotalPages(1);
    setCurrentPage(1);
    setMediaItems([]);
    setLastElement(null);
    search();
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
    if (searchParams.get('query') && mediaItems.length === 0) {
      search();
    }
  }, [location]);

  return (
    <section className="search">
      <header className="search__header container">
        <div className="total-results">
          <span className="total-results__label">Total:</span>
          <Chip
            text={totalResults.toString()}
            variant="text"
            className="total-results__value"
          />
        </div>
        <div className="query-param">
          <span className="query-param__label">Results for:</span>
          <Chip
            text={searchParams.get('query')}
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
        {mediaItems.length === 0 && (
          <div className="no-results">
            <Icon name="searchOff" size={100} color="accent" />
            <Chip
              text="No results"
              color="accent"
              variant="text"
              style={{ width: 200, fontSize: '1.2em' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchBrowse;
