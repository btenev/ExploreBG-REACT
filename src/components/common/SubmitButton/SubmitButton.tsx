interface Props {
  buttonName: string;
  isPending: boolean;
}

const SubmitButton = ({ buttonName, isPending }: Props) => {
  return (
    <button disabled={isPending}>
      {isPending ? 'Loading...' : buttonName}
    </button>
  );
};

export default SubmitButton;
