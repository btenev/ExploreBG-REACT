import LoadingSpinner from "../LoadingSpinner";

import "./LoadingScreenWrapper.scss";

const LoadingScreenWrapper = () => {
  return (
    <div className="fullscreen-center">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingScreenWrapper;
