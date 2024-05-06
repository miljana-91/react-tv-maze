import { Link } from 'react-router-dom';
import './NotFound.scss';
import React, { ReactElement } from 'react';

const NotFound = (): ReactElement => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">Page not found</h1>
      <p>
        <span>Back to </span>
        <Link to="/" className="not-found__link">
          home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
