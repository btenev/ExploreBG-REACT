interface Props {
  buttonName: string;
  isSubmitting: boolean;
  isValid: boolean;
}

const SubmitButton = ({ buttonName, isSubmitting, isValid }: Props) => {
  const isDisabled = isSubmitting || !isValid;

  return <button disabled={isDisabled}>{isSubmitting ? 'Loading...' : buttonName}</button>;
};

export default SubmitButton;
