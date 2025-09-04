import { Outlet } from "react-router-dom";

import { Footer, Header } from "@components/common";

// import '../../global-styles/main.scss';

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
