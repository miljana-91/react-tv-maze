import { useState } from 'react';

const usePagination = (
  items: any[],
  pageLimit: number,
): {
  pageNumber: number;
  pageCount: number;
  changePage: (pageNumber: number) => void;
  pageData: () => any[];
  nextPage: () => void;
  previousPage: () => void;
} => {
  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = Math.ceil(items.length / pageLimit);

  const changePage = (pageNumber: number): void => {
    setPageNumber(pageNumber);
  };

  const pageData = (): any[] => {
    const s = pageNumber * pageLimit;
    const e = s + pageLimit;
    return items.slice(s, e);
  };

  const nextPage = (): void => {
    setPageNumber(Math.min(pageNumber + 1, pageCount - 1));
  };

  const previousPage = (): void => {
    setPageNumber(Math.max(pageNumber - 1, 0));
  };

  return {
    pageNumber,
    pageCount,
    changePage,
    pageData,
    nextPage,
    previousPage,
  };
};

export default usePagination;
