import React, { ReactElement, useEffect, useState } from 'react';
import './Episodes.scss';
import { NavigateFunction, Params, useNavigate, useParams } from 'react-router-dom';
import Episode from '../../components/Episode/Episode';
import Pagination from '../../components/Pagination/Pagination';
import Button from '../../components/Button/Button';
import { IEpisode } from '../../models/episode.model';
import { v4 as uuid } from 'uuid';

const Episodes = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const params: Readonly<Params<string>> = useParams();
  const [data, setData] = useState<IEpisode[]>([]);
  const [pageOfItems, setPageOfItems] = useState<IEpisode[]>([]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${params.id}/episodes`)
      .then((response: Response) => response.json())
      .then((data: IEpisode[]) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  const onChangePage = (pageOfItems: IEpisode[]): void => {
    // update state with new page of items
    setPageOfItems(pageOfItems);
  };

  const navigateBack = (): void => {
    navigate(-1);
    window.scroll({ top: 600, behavior: 'smooth' });
  };

  return (
    <section className="episodes-page">
      <div className="episodes-page__episodes">
        {pageOfItems.map((item: IEpisode) => {
          return <Episode data={item} key={uuid()} />;
        })}
      </div>
      <Pagination items={data} onChangePage={onChangePage} initialPage={1} pageSize={10} />
      <Button onButtonClick={navigateBack} label="BACK" />
    </section>
  );
};

export default Episodes;
