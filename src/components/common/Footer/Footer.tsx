import { FaRegCopyright } from 'react-icons/fa6';

import './Footer.scss';
import { Logo } from '../';

const Footer = () => {
  return (
    <footer>
      <section>
        <Logo />

        <aside>
          <ul>
            <li>
              <a href="">Contact us</a>
            </li>
            <li>
              <a href="">Terms and conditions</a>
            </li>
          </ul>
        </aside>
      </section>
      <section>
        <span>
          <FaRegCopyright />
          {new Date().getFullYear()} Explore BG
        </span>
      </section>
    </footer>
  );
};

export default Footer;
