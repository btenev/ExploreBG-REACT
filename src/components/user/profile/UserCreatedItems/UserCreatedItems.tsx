import { ReactNode, useState } from 'react';

import './UserCreatedItems.scss';

interface Props<T> {
  items: T[];
  title: string;
  itemsPerPage?: number;
  renderItem: (item: T) => ReactNode;
}

const UserCreatedItems = <T,>({ items, title, itemsPerPage = 3, renderItem }: Props<T>) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const endIndex = currentIndex + itemsPerPage;
  const itemsForDisplay = items.slice(currentIndex, endIndex);

  const onPrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const onNextClick = () => {
    if (endIndex < items.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  return (
    <section className="user-items-section">
      <hr />

      <h2>Created {title}s</h2>

      {items.length > itemsPerPage && (
        <>
          <button
            onClick={onPrevClick}
            disabled={currentIndex == 0}
            className={`user-items-section${currentIndex != 0 ? '__active-btn' : ''}`}
            aria-label={`Previous ${title}s`}
          >
            {'<'}
          </button>
          <button
            onClick={onNextClick}
            disabled={endIndex >= items.length}
            className={`user-items-section${endIndex < items.length ? '__active-btn' : ''}`}
            aria-label={`Next ${title}s`}
          >
            {'>'}
          </button>
        </>
      )}

      <div className="user-items-section__created-items">
        {itemsForDisplay.map((item, index) => (
          <article key={index} className="card">
            {renderItem(item)}
          </article>
        ))}
      </div>
    </section>
  );
};

export default UserCreatedItems;
