import './Logo.scss';
import logo from '../../../assets/images/logo.png';

const Logo = () => {
  return (
    <figure className="logo">
      <figcaption>Explore BG</figcaption>
      <img
        src={logo}
        width={40}
        height={40}
        loading="eager"
        alt="Logo"
        title="Logo"
      />
    </figure>
  );
};

export default Logo;
