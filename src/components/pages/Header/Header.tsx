import { Link } from 'react-router-dom';
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
        <Link to="/" className={styles.logoLink}>
          <svg className={styles.logoMark} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 24C10 24 10 8 16 8C22 8 22 24 28 24" stroke="var(--route)" strokeWidth="2.5" strokeDasharray="1 6" strokeLinecap="round" />
            <circle cx="4" cy="24" r="3" fill="var(--navy)" />
            <circle cx="28" cy="24" r="3" fill="var(--route)" />
          </svg>
          <span className={styles.logoWord}>Big Trip</span>
        </Link>

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

        <div className={styles['page-header__account']}>
          <Link to="/profile" className={styles['page-header__profile-link']} aria-label="Personal account">
            <img src="/img/user.svg" alt="" className={styles.avatarIcon} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
