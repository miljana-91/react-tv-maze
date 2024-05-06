import React, { JSX, Dispatch, SetStateAction, useContext, useMemo, useState, ReactNode } from 'react';
import './Shows.scss';
import SearchShows from '../../components/SearchShows/SearchShows';
import { ShowsContext } from '../../store/shows.reducer';
import { IShowResult } from '../../models/show.model';
import ShowResult from '../../components/ShowResult/ShowResult';
import NoResults from '../../components/NoResults/NoResults';
import { v4 as uuid } from 'uuid';

const Shows = (): JSX.Element => {
  const showsContext = useContext(ShowsContext);
  const [tvShow, setTvShow]: [string, Dispatch<SetStateAction<string>>] = useState('');
  const [gotResults, setGotResults]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

  const showName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTvShow((e.target as HTMLInputElement).value);
  };

  const getResults = (): void => {
    window.scrollTo({ top: 500, behavior: 'smooth' });

    fetch(`https://api.tvmaze.com/search/shows?q=${tvShow ? tvShow : 431}`)
      .then((response: Response) => response.json())
      .then((data: IShowResult[]) => {
        showsContext.dispatch({ type: 'SET_SHOWS', payload: data });
        setGotResults(true);
      })
      .catch((error) => {
        console.log(error);
        setGotResults(true);
      });
  };

  const displayShows = useMemo((): ReactNode => {
    if (showsContext.store.shows.length) {
      return showsContext.store.shows.map((show: IShowResult) => <ShowResult data={show} key={uuid()} />);
    } else if (gotResults && !showsContext.store.shows.length) {
      return <NoResults text="No matching results." />;
    } else {
      return null;
    }
  }, [showsContext.store.shows, gotResults]);

  return (
    <section className="results">
      <SearchShows showName={showName} getResults={getResults} />
      {displayShows}
    </section>
  );
};

export default Shows;
