import React, { Fragment, ReactElement, useContext, useEffect, useState } from 'react';
import './Homepage.scss';
import Loader from '../../components/Loader/Loader';
import Result from './Result';
import { ShowsContext } from '../../store/shows.reducer';
import Pagination from '../../components/Pagination/Pagination';
import { IScheduled } from '../../models/scheduled.model';
import { v4 as uuid } from 'uuid';

const Homepage = (): ReactElement => {
  const showsContext = useContext(ShowsContext);
  const [pageOfItems, setPageOfItems] = useState<any[]>([]);

  useEffect((): void => {
    fetch(`https://api.tvmaze.com/schedule?country=US`)
      .then((response: Response) => response.json())
      .then((data: IScheduled[]) => {
        showsContext.dispatch({ type: 'SET_SCHEDULE', payload: data });
      });

    // eslint-disable-next-line
  }, []);

  const onChangePage = (pageOfItems: IScheduled[]): void => {
    // update state with new page of items
    setPageOfItems(pageOfItems);
  };

  return (
    <Fragment>
      {showsContext.store?.schedule.length ? (
        <Fragment>
          <section className="homepage-schedule">
            <h1>Schedule for today</h1>
            {pageOfItems.map((item: IScheduled) => {
              return <Result key={uuid()} data={item} />;
            })}
          </section>
          <Pagination items={showsContext.store?.schedule} onChangePage={onChangePage} initialPage={1} pageSize={20} />
        </Fragment>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default Homepage;
