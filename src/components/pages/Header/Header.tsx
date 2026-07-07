import type { FilterType } from '../../../types/event.ts';
import TripInfo from '../../UI/TripInfo/TripInfo.tsx';
import TripFilters from '../../UI/TripFilters/TripFilters.tsx';
import EventAddButton from '../../UI/EventAddButton/EventAddButton.tsx';
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  dates: string;
  totalCost: number;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onAddEventClick: () => void;
  isAddButtonDisabled?: boolean;
  disabledFilters?: FilterType[];
}

const Header = (props: HeaderProps) => {
  const {
    title,
    dates,
    totalCost,
    activeFilter,
    onFilterChange,
    onAddEventClick,
    isAddButtonDisabled,
    disabledFilters,
  } = props;

  return (
    <header className={styles['page-header']}>
      <div className={`page-body__container ${styles['page-header__container']}`}>
        <img className={styles['page-header__logo']} src="/img/logo.png" width={42} height={42} alt="Trip logo" />

        <div className={styles['trip-main']}>
          <TripInfo title={title} dates={dates} totalCost={totalCost} />

          <div className={`${styles['trip-main__trip-controls']} ${styles['trip-controls']}`}>
            <TripFilters
              activeFilter={activeFilter}
              onFilterChange={onFilterChange}
              disabledFilters={disabledFilters}
            />
          </div>

          <EventAddButton onClick={onAddEventClick} disabled={isAddButtonDisabled} />
        </div>
      </div>
    </header>
  );
};

export default Header;