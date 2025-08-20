import './ImportantNotice.scss';

const ImportantNotice = () => {
  return (
    <details open className="important-notice">
      <summary>Important Notice:</summary>
      While ExploreBG moderates the data, its accuracy cannot always be guaranteed. ExploreBG is not
      responsible for any errors or inaccuracies. Please verify information through other reliable
      sources and exercise caution.
    </details>
  );
};

export default ImportantNotice;
