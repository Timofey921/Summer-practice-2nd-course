import type { SortType } from '../../../types/event.ts';
import styles from './TripSort.module.css';

interface TripSortProps {
  activeSort: SortType;
  onSortChange: (sort: SortType) => void;
}

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: 'day', label: 'Day' },
  { value: 'time', label: 'Time' },
  { value: 'price', label: 'Price' },
];

const TripSort = ({ activeSort, onSortChange }: TripSortProps) => (
  <form className={`${styles['trip-events__trip-sort']} ${styles['trip-sort']}`} action="#" method="get">
    {SORT_OPTIONS.map((option) => (
      <div
        className={`${styles['trip-sort__item']} ${styles[`trip-sort__item--${option.value}`]}`}
        key={option.value}
      >
        <input
          id={`sort-${option.value}`}
          className={`${styles['trip-sort__input']} visually-hidden`}
          type="radio"
          name="trip-sort"
          value={`sort-${option.value}`}
          checked={activeSort === option.value}
          onChange={() => onSortChange(option.value)}
        />
        <label className={styles['trip-sort__btn']} htmlFor={`sort-${option.value}`}>
          {option.label}
        </label>
      </div>
    ))}
  </form>
);

export default TripSort;
