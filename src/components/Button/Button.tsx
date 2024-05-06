import React, { ReactElement, memo, useCallback } from 'react';
import './Button.scss';

const Button = ({
  label,
  onButtonClick,
}: {
  label: string;
  onButtonClick: null | ((event: React.MouseEvent<HTMLButtonElement>) => void);
}): ReactElement => {
  const onClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      if (onButtonClick) {
        onButtonClick(event);
      }
    },
    [onButtonClick],
  );

  return (
    <button className="button" onClick={(event: React.MouseEvent<HTMLButtonElement>): void => onClick(event)}>
      {label}
    </button>
  );
};

export default memo(Button);
