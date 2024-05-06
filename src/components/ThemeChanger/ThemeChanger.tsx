import React, { useState, useEffect, memo, ReactElement } from 'react';
import Switch from '../Switch/Switch';
import './ThemeChanger.scss';

const ThemeChanger = (): ReactElement => {
  const [themeState, setThemeState] = useState<boolean>(false);

  useEffect(() => {
    const getTheme: string | null = localStorage.getItem('Theme');

    if (getTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const handleChange = (): void => {
    setThemeState(!themeState);

    if (themeState) {
      localStorage.setItem('Theme', 'dark');
      document.body.classList.add('dark-mode');
    } else {
      localStorage.setItem('Theme', 'light');
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <div className="theme-changer">
      <i className="fa-solid fa-moon theme-changer__icon"></i>
      <Switch isDisabled={false} switchValueChange={handleChange} switchClick={handleChange} />
      <i className="fa-solid fa-sun theme-changer__icon"></i>
    </div>
  );
};

export default memo(ThemeChanger);
