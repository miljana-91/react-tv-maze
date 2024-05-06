import React, { ReactElement, memo } from 'react';
import Button from '../Button/Button';
import './ShowResult.scss';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { IShowResult } from '../../models/show.model';
import Genres from '../Genres/Genres';

const ShowResult = ({ data }: { data: IShowResult }): ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  const getCast = (): void => {
    navigate(`/shows/${data.show.id}/cast`);
  };

  return (
    <div className="result" id={data.show.url} data-showid={data.show.id}>
      <img
        src={data.show.image ? data.show.image.medium : `${process.env.PUBLIC_URL}/images/no-img.png`}
        alt="show-img"
      />
      <div className="result__info">
        <h3>{data.show.name}</h3>
        <Genres genres={data.show.genres} />
        <p>
          <b>Language: </b>
          {data.show.language}
        </p>
        <p>
          <b>Runtime: </b>
          {data.show.runtime} min.
        </p>
        <p>
          <b>Status: </b>
          {data.show.status}
        </p>
        <p>
          <b>Premiered: </b>
          {data.show.premiered}
        </p>
        <div className="result__info__buttons">
          <Button label="SEE CAST" onButtonClick={getCast} />
          <Link to={`/shows/${data.show.id}`}>
            <Button label="MORE" onButtonClick={null} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(ShowResult);
