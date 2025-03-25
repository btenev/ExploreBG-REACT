import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import './Header.scss';
import Logo from '../Logo';

const Header = () => {
  const [prevScrollPosition, setPrevScrollPosition] = useState<number>(0);
  const [isHeaderVisible, setHeaderVisible] = useState<boolean>(true);
  const [isSearchOpen, setSearchOpen] = useState<boolean>(true);

  // TODO: Optimize - solution in obsidian

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageXOffset;
      const isVisible =
        prevScrollPosition > currentScrollPosition ||
        currentScrollPosition < 10;

      setPrevScrollPosition(currentScrollPosition);
      setHeaderVisible(isVisible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPosition]);

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

        <aside className="header__nav__theme-lang">Some</aside>
      </article>
    </header>
  );
};

export default Header;
