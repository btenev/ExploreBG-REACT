import { Outlet } from 'react-router-dom';

import '../../global-styles/main.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Layout = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
