import { ReactNode } from 'react';

import './FieldPair.scss';

interface Props {
  children: ReactNode;
}

const FieldPair = ({ children }: Props) => {
  return <div className="field-pair">{children}</div>;
};

export default FieldPair;
