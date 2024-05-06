import React, { ReactElement, ReactNode, useCallback, useMemo, useState } from 'react';
import './Schedule.scss';
import SearchSchedule from '../../components/SearchSchedule/SearchSchedule';
import ScheduleResult from '../../components/ScheduleResult/ScheduleResult';
import { IScheduled } from '../../models/scheduled.model';
import Pagination from '../../components/Pagination/Pagination';
import NoResults from '../../components/NoResults/NoResults';
import { v4 as uuid } from 'uuid';

const Schedule = (): ReactElement => {
  const [data, setData] = useState<IScheduled[]>([]);
  const [pageOfItems, setPageOfItems] = useState<IScheduled[]>([]);
  const [country, setCountry] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [requestSent, setRequestSent] = useState<boolean>(false);

  const getResults = useCallback((): void => {
    fetch(`https://api.tvmaze.com/schedule?country=${country}&date=${date}`)
      .then((response: Response) => response.json())
      .then((data: IScheduled[]) => {
        setRequestSent(true);
        setData(data.length ? data : []);

        window.scrollTo({ top: 500, behavior: 'smooth' });
      })
      .catch((error) => {
        console.log(error);
        setData([]);
      });
  }, [country, date]);

  const getDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDate((e.target as HTMLInputElement).value);
  };

  const getCountry = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCountry(e.target.value);
  };

  const onChangePage = (pageOfItems: IScheduled[]): void => {
    // update state with new page of items
    setPageOfItems(pageOfItems);
  };

  const displayResults = useMemo((): ReactNode => {
    if (data.length && requestSent) {
      return pageOfItems.map((result: IScheduled) => {
        return <ScheduleResult data={result} key={uuid()} />;
      });
    } else if (!data.length && requestSent) {
      return <NoResults text="No results available." />;
    } else {
      return null;
    }
  }, [requestSent, data, pageOfItems]);

  return (
    <section className="schedule">
      <SearchSchedule getResults={getResults} getDate={getDate} getCountry={getCountry} />
      <div className="schedule__results">{displayResults}</div>
      <Pagination items={data} onChangePage={onChangePage} initialPage={1} pageSize={10} />
    </section>
  );
};

export default Schedule;
