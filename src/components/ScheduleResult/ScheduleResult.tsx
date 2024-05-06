import { IScheduled } from '../../models/scheduled.model';
import Genres from '../Genres/Genres';
import './ScheduleResult.scss';
import React, { ReactElement, memo } from 'react';
import { v4 as uuid } from 'uuid';

const ScheduleResult = ({ data }: { data: IScheduled }): ReactElement => {
  return (
    <div className="schedule-result">
      <img
        src={data.show.image ? data.show.image.medium : `${process.env.PUBLIC_URL}/images/no-img.png`}
        alt="show-img"
      />
      <div className="schedule-result__info">
        <h3 className="schedule-result__info__title">{data.show.name}</h3>
        <div className="schedule-result__info__genres">
          <Genres genres={data.show.genres} />
        </div>
        {data.show.officialSite ? (
          <p
            className="schedule-result__info__official-site"
            onClick={(): void => {
              window.open(data.show.officialSite, '_blank');
            }}
          >
            <b>Official site: </b>
            {data.show.officialSite}
          </p>
        ) : null}
        <p>
          <b>Status: </b>
          {data.show.status}
        </p>
        <p>
          <b>Runtime: </b>
          {data.show.runtime} min.
        </p>
        <p>
          <b>Type: </b>
          {data.show.type}
        </p>
        <p>
          <b>Schedule: </b>
          {data.show.schedule.time} &nbsp;
          {data.show.schedule.days.map((day: string) => (
            <span key={uuid()} className="schedule-result__info__genre">
              {day}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default memo(ScheduleResult);
