import { IEpisode } from '../../models/episode.model';
import './Episode.scss';
import React, { ReactElement } from 'react';

const Episode = ({ data }: { data: IEpisode }): ReactElement => {
  return (
    <div className="episode">
      <img
        src={data.image && data.image.medium ? data.image.medium : `${process.env.PUBLIC_URL}/images/no-img.png`}
        alt="poster"
      />
      <div className="episode__info">
        <p className="episode__info__name">{data.name}</p>
        <p>
          <b>Season</b>: {data.season},<b> Episode</b>: {data.number},<b> Airdate</b>: {data.airdate}
        </p>
        {data.summary ? (
          <p>
            <b>Summary</b>: <span dangerouslySetInnerHTML={{ __html: data.summary }} />
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Episode;
