import { ComponentProps } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './ActiveLink.scss';

type Props = ComponentProps<typeof Link>;

const ActiveLink = ({ to, ...rest }: Props) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return <Link to={to} className={`link ${isActive ? 'active-page-link' : ''}`} {...rest}></Link>;
};

export default ActiveLink;
