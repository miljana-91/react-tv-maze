import React, { ReactElement, memo } from 'react';
import Button from '../Button/Button';
import './SearchShows.scss';
import Input from '../Input/Input';

const SearchShows = (props: {
  showName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getResults: () => void;
}): ReactElement => {
  return (
    <div className="search-field">
      <Input
        type="text"
        defaultValue={''}
        placeholder="SEARCH TV SHOW"
        onInputChange={(e: React.ChangeEvent<HTMLInputElement>): void => props.showName(e)}
      />
      <Button label="GET RESULTS" onButtonClick={props.getResults} />
    </div>
  );
};

export default memo(SearchShows);
