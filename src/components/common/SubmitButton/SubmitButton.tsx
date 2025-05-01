interface Props {
  buttonName: string;
  isSubmitting: boolean;
}

const SubmitButton = ({ buttonName, isSubmitting }: Props) => {
  return <button disabled={isSubmitting}>{isSubmitting ? 'Loading...' : buttonName}</button>;
};

export default SubmitButton;
