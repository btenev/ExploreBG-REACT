import { ReactNode } from "react";

import { AdminLayout, SmallFooter } from "@components/common";

import "./AdminProtectedPage.scss";

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
