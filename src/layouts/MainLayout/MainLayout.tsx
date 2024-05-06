import { Outlet } from 'react-router-dom';
import './MainLayout.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import HeaderSlider from '../../components/HeaderSlider/HeaderSlider';
import React, { ReactElement, memo } from 'react';

const Layout = (): ReactElement => {
  const links: { [key: string]: string } = {
    homepage: '/',
    shows: '/shows',
    schedule: '/schedule',
  };

  const goToTop = (): void => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="layout">
      <Header links={links} />
      <HeaderSlider />
      <main>
        <Outlet />
      </main>
      <Footer />
      <img
        className="layout__arrow-up"
        src={`${process.env.PUBLIC_URL}/images/arrow.png`}
        alt="arrow-up"
        title="Go to top"
        onClick={goToTop}
      />
    </div>
  );
};

export default memo(Layout);
