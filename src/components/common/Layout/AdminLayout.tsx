import { ReactNode } from 'react';

import { Header } from '../Header';

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <Header />

      {children}
    </>
  );
};

export default AdminLayout;
