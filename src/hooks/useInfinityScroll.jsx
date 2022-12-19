import { useState, useEffect, useRef } from 'react';
import { removeDuplicateId } from '@/utils';

const useInifinityScroll = ({
  lazyLoader,
  urlParams,
  observerOptions
} = {}) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [lastElement, setLastElement] = useState(null);
  const [loading, setLoading] = useState(false);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setCurrentPage((value) => value + 1);
        }
      },
      { observerOptions }
    )
  );

  const getNextPage = async () => {
    if (!Object.values(urlParams).every((v) => v) || currentPage > totalPages)
      return;
    try {
      setLoading(true);
      const data = await lazyLoader({ ...urlParams, page: currentPage });
      setTotalPages(data.total_pages);
      const results = [...data.results];
      setTotalResults(data.total_results);
      let allData = [];
      if (currentPage === 1) {
        allData = results;
      } else {
        allData = [...items, ...results];
      }
      const newData = removeDuplicateId(allData);
      setItems(newData);
    } catch (error) {
      console.log(
        '🚀 ~ file: useInfinityScroll.jsx:30 ~ getNextPage ~ error',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setTotalPages(1);
    setCurrentPage(1);
    setTotalResults(0);
    setItems([]);
    setLastElement(null);
    getNextPage();
  };

  useEffect(() => {
    getNextPage();
  }, [currentPage]);

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

  return { reset, setLastElement, totalPages, totalResults, loading, items };
};

export default useInifinityScroll;
