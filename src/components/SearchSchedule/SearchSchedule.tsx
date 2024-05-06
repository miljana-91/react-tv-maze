import React, { ReactElement, memo, useMemo } from 'react';
import './SearchSchedule.scss';
import Button from '../Button/Button';
import Label from '../Label/Label';
import Input from '../Input/Input';

const SearchSchedule = ({
  getCountry,
  getDate,
  getResults,
}: {
  getCountry: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  getDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getResults: () => void;
}): ReactElement => {
  const todayDate = useMemo((): string => {
    let today: Date = new Date();
    return today.toISOString().split('T')[0];
  }, []);

  return (
    <div className="search-schedule-form">
      <Label id="date-label" label="Select date" />
      <Input type="date" onInputChange={getDate} defaultValue={todayDate} placeholder={''} />
      <Label id="country-label" label="Select country" />
      <select onChange={getCountry}>
        <option value="AU">Australia</option>
        <option value="BR">Brazil</option>
        <option value="CN">China</option>
        <option value="FR">France</option>
        <option value="JP">Japan</option>
        <option value="RU">Russian Federation</option>
        <option value="US">USA</option>
        <option value="GB">United Kingdom</option>
      </select>
      <Button label="GET SCHEDULE" onButtonClick={getResults} />
    </div>
  );
};

export default memo(SearchSchedule);
