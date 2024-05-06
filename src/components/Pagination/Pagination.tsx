import React, { ReactElement, memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';
import { v4 as uuid } from 'uuid';

type Pager = {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
};

const Pagination = ({
  initialPage = 1,
  pageSize = 30,
  items,
  onChangePage,
}: {
  initialPage: number;
  pageSize: number;
  items: any;
  onChangePage: (pageOfItems: any) => void;
}): ReactElement | null => {
  const [pager, setPager] = useState<Pager | null>(null);

  useEffect(() => {
    // set page if items array isn't empty
    if (items && items.length) {
      setPage(initialPage);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // reset page if items array has changed
    setPage(initialPage);

    // eslint-disable-next-line
  }, [items]);

  const setPage = (page: number): void => {
    window.scroll({ top: 400, behavior: 'smooth' });

    let newPager: null | Pager = pager;

    // get new pager object for specified page
    newPager = getPager(items.length, page, pageSize);

    // get new page of items from items array
    const pageOfItems = items.slice(newPager.startIndex, newPager.endIndex + 1);

    // update state
    setPager(newPager);

    // call change page function in parent component
    onChangePage(pageOfItems);
  };

  const getPager = (totalItems: number, currentPage: number, pageSize: number): Pager => {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex: number = (currentPage - 1) * pageSize;
    const endIndex: number = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map((i) => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  };

  if (!pager || !pager.pages || !pager.pages.length) {
    // don't display pager if there is only 1 page
    return null;
  }

  return (
    <ul className="pagination">
      <li className={pager.currentPage === 1 ? 'disabled' : ''} onClick={(): void => setPage(1)}>
        &lt;&lt;
      </li>
      <li className={pager.currentPage === 1 ? 'disabled' : ''} onClick={(): void => setPage(pager.currentPage - 1)}>
        Previous
      </li>
      {pager.pages.map((page: number) => (
        <li key={uuid()} className={pager.currentPage === page ? 'active' : ''} onClick={(): void => setPage(page)}>
          {page}
        </li>
      ))}
      <li
        className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
        onClick={(): void => setPage(pager.currentPage + 1)}
      >
        Next
      </li>
      <li
        className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
        onClick={(): void => setPage(pager.totalPages)}
      >
        &gt;&gt;
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
};

export default memo(Pagination);
