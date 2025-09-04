interface Props {
  buttonName: string;
  isSubmitting: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const SubmitButton = ({
  buttonName,
  isSubmitting,
  className,
  onClick,
  disabled,
}: Props) => {
  return (
    <button
      className={className}
      disabled={isSubmitting || disabled}
      onClick={onClick}
    >
      {isSubmitting ? "Loading..." : buttonName}
    </button>
  );
};

export default SubmitButton;
