import './LoadingScreenWrapper.scss';

import LoadingSpinner from '../LoadingSpinner';

const LoadingScreenWrapper = () => {
  return (
    <div className="fullscreen-center">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingScreenWrapper;
