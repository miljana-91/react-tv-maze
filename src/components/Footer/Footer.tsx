import React, { ReactElement, memo } from 'react';
import './Footer.scss';

const Footer = (): ReactElement => {
  return (
    <footer>
      <span>Created with </span>
      <img src={`${process.env.PUBLIC_URL}/images/heart.png`} alt="heart" className="heart-img" />
      <span> and </span>
      <span className="react-js">React.js</span>
      <img src={`${process.env.PUBLIC_URL}/images/react-logo.png`} alt="react logo" className="react-img" />
    </footer>
  );
};

export default memo(Footer);
