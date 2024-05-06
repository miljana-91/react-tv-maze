import React, { useState } from 'react';

export interface IUseInput {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useInput = (initialValue: string): IUseInput => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};
