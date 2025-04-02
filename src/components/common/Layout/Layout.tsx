import { Outlet } from 'react-router-dom';

// import '../../global-styles/main.scss';
import { Footer, Header } from '..';

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
