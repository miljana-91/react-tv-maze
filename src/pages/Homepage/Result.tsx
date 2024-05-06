import React, { ReactElement, memo } from 'react';
import './Result.scss';
import { Link } from 'react-router-dom';
import { IScheduled } from '../../models/scheduled.model';

const Result = ({ data }: { data: IScheduled }): ReactElement => {
  return (
    <div className="episode">
      <div className="episode__info">
        <Link to={`/shows/${data.show.id}`}>
          <p className="episode__info__name">{data.show.name}</p>
        </Link>
        <p>
          <span>{data.name} </span>
          <i className="fa-solid fa-video"></i>
        </p>
        <p>
          <b>Season</b>: {data.season},<b> Episode</b>: {data.number},<b> Airtime</b>: {data.airtime}
        </p>
      </div>
    </div>
  );
};

export default memo(Result);
