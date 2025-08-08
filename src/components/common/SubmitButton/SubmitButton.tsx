interface Props {
  buttonName: string;
  isSubmitting: boolean;
  className?: string;
  onClick?: () => void;
}

const SubmitButton = ({ buttonName, isSubmitting, className, onClick }: Props) => {
  return (
    <button className={className} disabled={isSubmitting} onClick={onClick}>
      {isSubmitting ? 'Loading...' : buttonName}
    </button>
  );
};

export default SubmitButton;
