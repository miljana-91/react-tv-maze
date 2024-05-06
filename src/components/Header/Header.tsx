import React, { ReactElement, ReactNode, memo, useMemo } from 'react';
import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import ThemeChanger from '../ThemeChanger/ThemeChanger';

const Header = ({ links }: { links: { [key: string]: string } }): ReactElement => {
  const visitSite = (): void => {
    window.open('https://www.tvmaze.com/', '_blank');
  };

  const renderNav = useMemo(() => {
    let navLinks: { page: string; link: string }[] = [];

    for (let link in links) {
      navLinks.push({
        page: link,
        link: links[link],
      });
    }

    return navLinks;
  }, [links]);

  const scrollDown = (): void => {
    window.scroll({ top: 500, behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__inner__heading">
          <img src={`${process.env.PUBLIC_URL}/images/tvm-logo.png`} alt="heading" />
        </Link>
        <nav>
          <ul>
            {renderNav.map(
              (link): ReactNode => (
                <li key={link.link} onClick={scrollDown}>
                  <NavLink to={link.link}>{link.page}</NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="header__inner__theme-changer">
          <ThemeChanger />
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/images/nice-day.png`}
          alt="logo"
          className="header__inner__logo"
          onClick={visitSite}
        />
      </div>
    </header>
  );
};

export default memo(Header);
