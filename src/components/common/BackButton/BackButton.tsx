import { RiArrowGoBackFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}>
      Back <RiArrowGoBackFill style={{ fontSize: '0.85rem' }} />
    </button>
  );
};

export default BackButton;
