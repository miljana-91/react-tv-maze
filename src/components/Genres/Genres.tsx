import React, { ReactElement, ReactNode, memo } from 'react';
import './Genres.scss';
import { v4 as uuid } from 'uuid';

const Genres = ({ genres }: { genres: string[] }): ReactElement => {
  return (
    <div className="genres">
      {genres.map(
        (genre: string, i: number): ReactNode => (
          <span className="genres__genre" key={uuid()}>
            {genre}
          </span>
        ),
      )}
    </div>
  );
};

export default memo(Genres);
