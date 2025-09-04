import { ReactNode } from "react";

import { Header } from "../Header";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="container">
      <Header />

      {children}
    </div>
  );
};

export default AdminLayout;
