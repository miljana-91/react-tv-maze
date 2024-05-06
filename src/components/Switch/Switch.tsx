import React, { ReactElement, memo, useState } from 'react';
import './Switch.scss';

const Switch = ({
  isDisabled,
  switchValueChange,
  switchClick,
}: {
  isDisabled: boolean;
  switchValueChange: (checked: boolean) => void;
  switchClick: (checked: boolean) => void;
}): ReactElement => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onInputChange = (newValue: React.ChangeEvent<HTMLInputElement>): void => {
    const checked: boolean = (newValue.target as HTMLInputElement).checked;

    setIsChecked(checked);
    switchValueChange(checked);
  };

  const onClick = (event: React.MouseEvent<HTMLInputElement>): void => {
    switchClick(!!(event.target as HTMLInputElement).value);
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isChecked}
        disabled={isDisabled}
        className="switch__input"
        onClick={(event: React.MouseEvent<HTMLInputElement>): void => onClick(event)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => onInputChange(event)}
      />
      <span className={'switch__slider' + (isDisabled ? 'switch__slider--read-only' : '')}></span>
    </label>
  );
};

export default memo(Switch);
