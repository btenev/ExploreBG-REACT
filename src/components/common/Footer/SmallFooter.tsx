import { FaRegCopyright } from 'react-icons/fa6';

import './SmallFooter.scss';

const SmallFooter = () => {
  return (
    <footer className="small-footer">
      <FaRegCopyright /> {new Date().getFullYear()} Explore BG
    </footer>
  );
};

export default SmallFooter;
