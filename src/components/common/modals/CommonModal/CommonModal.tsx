import { ReactNode } from 'react';

import './CommonModal.scss';

interface Props {
  children: ReactNode;
}

const CommonModal = ({ children }: Props) => {
  return (
    <section className="pop-up-wrapper">
      <article className="pop-up-wrapper__modal">{children}</article>
    </section>
  );
};

export default CommonModal;
