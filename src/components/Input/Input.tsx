import React, { ReactElement, memo, useCallback } from 'react';
import { IUseInput, useInput } from '../../utilities/use-input';

const Input = ({
  type,
  placeholder,
  onInputChange,
  defaultValue,
}: {
  type: string;
  placeholder: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue: any;
}): ReactElement => {
  const input: IUseInput = useInput(defaultValue);

  const inputChanged = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      input.onChange(e);
      onInputChange(e);
    },
    [input, onInputChange],
  );

  return (
    <input
      className="input"
      placeholder={placeholder}
      type={type}
      value={input.value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => inputChanged(e)}
    />
  );
};

export default memo(Input);
