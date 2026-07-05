import type { FilterType } from '../../types/event.ts';
import styles from './TripFilters.module.css';

interface TripFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  disabledFilters?: FilterType[];
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'everything', label: 'Everything' },
  { value: 'future', label: 'Future' },
  { value: 'present', label: 'Present' },
  { value: 'past', label: 'Past' },
];

const TripFilters = (props: TripFiltersProps) => {
  const {
    activeFilter,
    onFilterChange,
    disabledFilters = [],
  } = props;

  return (
    <div className={styles['trip-controls__filters']}>
      <h2 className="visually-hidden">Filter events</h2>

      <form className={styles['trip-filters']} action="#" method="get">
        {FILTERS.map((filter) => (
          <div className={styles['trip-filters__filter']} key={filter.value}>
            <input
              id={`filter-${filter.value}`}
              className={`${styles['trip-filters__filter-input']} visually-hidden`}
              type="radio"
              name="trip-filter"
              value={filter.value}
              checked={activeFilter === filter.value}
              disabled={disabledFilters.includes(filter.value)}
              onChange={() => onFilterChange(filter.value)}
            />
            <label className={styles['trip-filters__filter-label']} htmlFor={`filter-${filter.value}`}>
              {filter.label}
            </label>
          </div>
        ))}

        <button className="visually-hidden" type="submit">
          Accept filter
        </button>
      </form>
    </div>
  );
};

export default TripFilters;