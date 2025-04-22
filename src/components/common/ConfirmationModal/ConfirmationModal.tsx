import './ConfirmationModal.scss';

interface Props {
  deletionObj: string;
  confirm: () => void;
  cancel: () => void;
}

const ConfirmationModal = ({ deletionObj, confirm, cancel }: Props) => {
  return (
    <section className="pop-up-wrapper">
      <article className="pop-up-wrapper__modal">
        <div className="pop-up-wrapper__modal__confirmation">
          <p>Are you sure you want to delete {deletionObj}?</p>

          <button onClick={confirm} className="deleteBtn">
            Yes, delete
          </button>
          <button onClick={cancel}>Cancel</button>
        </div>
      </article>
    </section>
  );
};

export default ConfirmationModal;
