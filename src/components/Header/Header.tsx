import { useEffect, useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

import './Header.scss';
import Logo from '../Logo';
import { SwitchTheme } from '../SwitchTheme';

const Header = () => {
  const [isHeaderVisible, setHeaderVisible] = useState<boolean>(true);
  const [isSearchOpen, setSearchOpen] = useState<boolean>(false);
  const prevScrollPosition = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const currentScrollPosition = window.scrollY;
        const isVisible =
          prevScrollPosition.current > currentScrollPosition ||
          currentScrollPosition < 10;

        prevScrollPosition.current = currentScrollPosition;
        setHeaderVisible(isVisible);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className="header"
      style={{ display: isHeaderVisible ? 'flex' : 'none' }}
    >
      <Logo />

      <article className="header__nav">
        <FaSearch onClick={() => setSearchOpen(!isSearchOpen)} />
        {isSearchOpen && (
          <section className="header__nav__search">
            <p>Search</p>
          </section>
        )}

        <aside className="header__nav__theme-lang">
          <SwitchTheme />
        </aside>
      </article>
    </header>
  );
};

export default Header;
