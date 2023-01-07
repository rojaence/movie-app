import { useState, useEffect, useRef } from 'react';
import { removeDuplicateId } from '@/utils';

const useInifinityScroll = ({
  lazyLoader,
  urlParams,
  observerOptions
} = {}) => {
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [lastElement, setLastElement] = useState(null);
  const [queryParams, setQueryParams] = useState(urlParams);
  const [loading, setLoading] = useState(false);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setNextPage((value) => value + 1);
        }
      },
      { observerOptions }
    )
  );

  // const isTruthy = (obj) => Object.values(obj).every((value) => value);

  const getResultsPage = async (page) => {
    if (page - 1 > totalPages) return;
    try {
      setLoading(true);
      const data = await lazyLoader({ ...queryParams, page });
      setTotalPages(data.total_pages);
      const results = [...data.results];
      setTotalResults(data.total_results);
      let allData = [];
      if (page === 1) {
        allData = results;
      } else {
        allData = [...items, ...results];
      }
      const newData = removeDuplicateId(allData);
      setItems(newData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setTotalPages(1);
    setNextPage(1);
    setTotalResults(0);
    setItems([]);
    setLastElement(null);
    getResultsPage(1);
  };

  useEffect(() => {
    if (nextPage === 1 && totalPages === 1) return;
    getResultsPage(nextPage);
  }, [nextPage]);

  useEffect(() => {
    reset();
  }, [queryParams]);

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

  return {
    reset,
    setLastElement,
    totalPages,
    totalResults,
    loading,
    items,
    setUrlParams: setQueryParams
  };
};

export default useInifinityScroll;
