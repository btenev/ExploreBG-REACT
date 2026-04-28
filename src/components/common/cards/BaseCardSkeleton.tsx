import "./BaseCardSkeleton.scss";

export const BaseCardSkeleton = () => (
  <article className="card card--skeleton">
    <figure className="card--skeleton__figure" />
    <div className="card--skeleton__title" />
    <div className="card--skeleton__subtitle" />
    <div className="card--skeleton__description">
      <div />
      <div />
      <div />
    </div>
    <div className="card--skeleton__link" />
  </article>
);

export const CardSkeletons = ({ numOfCards }: { numOfCards: number }) => (
  <>
    {Array.from({ length: numOfCards }).map((_, i) => (
      <BaseCardSkeleton key={i} />
    ))}
  </>
);
