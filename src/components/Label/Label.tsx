import './Label.scss';
import React, { ReactElement, memo } from 'react';

const Label = ({ label, id }: { label: string; id?: string }): ReactElement => {
  return (
    <label className="label" id={id}>
      {label}
    </label>
  );
};

export default memo(Label);
