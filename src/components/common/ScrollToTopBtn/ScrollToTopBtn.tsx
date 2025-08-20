import React, { useState, useEffect, useCallback } from 'react';
import { TfiArrowCircleUp } from 'react-icons/tfi';

import './scrollToTopBtn.scss';

const ScrollToTopBtn: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.pageYOffset > 800);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // check scroll on mount

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [toggleVisibility]);

  return (
    <button
      onClick={scrollToTop}
      className={`scrollToTopBtn ${isVisible ? 'visible' : ''}`}
      aria-label="Scroll to top"
    >
      <TfiArrowCircleUp />
    </button>
  );
};

export default ScrollToTopBtn;
