import { ReactNode } from 'react';

import './AdminProtectedPage.scss';

import { AdminLayout } from '../Layout';
import { SmallFooter } from '../Footer';

interface Props {
  children: ReactNode;
}

const AdminProtectedPage = ({ children }: Props) => {
  return (
    <AdminLayout>
      <main className="admin-wrapper">
        {children}

        <SmallFooter />
      </main>
    </AdminLayout>
  );
};

export default AdminProtectedPage;
