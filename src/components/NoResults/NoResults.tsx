import React, { ReactElement } from 'react';
import './NoResults.scss';

const NoResults = ({ text }: { text: string }): ReactElement => {
  return <div className="no-results">{text}</div>;
};

export default NoResults;
