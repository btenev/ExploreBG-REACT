import { Outlet } from 'react-router-dom';
import { SmallFooter, SmallHeader } from '..';

const SmallLayout = () => {
  return (
    <>
      <SmallHeader />
      <Outlet />
      <SmallFooter />
    </>
  );
};

export default SmallLayout;
