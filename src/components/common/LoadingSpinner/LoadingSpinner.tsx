import './LoadingSpinner.scss';

interface Props {
  width?: string;
  height?: string;
  fontSize?: string;
  uploadOrDelete?: string;
}

const LoadingSpinner = ({ width, height, fontSize, uploadOrDelete }: Props) => {
  return (
    <div
      className="spinner"
      style={{
        width: width ?? '8rem',
        height: height ?? '8rem',
        fontSize: fontSize ?? '1rem',
      }}
    >
      {uploadOrDelete ?? 'Loading...'}
    </div>
  );
};

export default LoadingSpinner;
