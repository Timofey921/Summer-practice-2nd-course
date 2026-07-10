import { Link, useNavigate } from 'react-router-dom';
import authService from '../../../../services/authService';
import styles from './ProfileHeader.module.css';

const ProfileHeader = () => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    authService.logout();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink}>
          <svg className={styles.logoMark} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 24C10 24 10 8 16 8C22 8 22 24 28 24"
              stroke="var(--route)"
              strokeWidth="2.5"
              strokeDasharray="1 6"
              strokeLinecap="round"
            />
            <circle cx="4" cy="24" r="3" fill="var(--navy)" />
            <circle cx="28" cy="24" r="3" fill="var(--route)" />
          </svg>
          <span className={styles.logoWord}>Big Trip</span>
        </Link>

        <nav className={styles.navLinks}>
          <Link to="/workspace">To planning</Link>
        </nav>

        <button type="button" className={styles.logoutButton} onClick={handleLogout}>
          <svg className={styles.logoutIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 17L20 12L15 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M20 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M9 19H6C4.89543 19 4 18.1046 4 17V7C4 5.89543 4.89543 5 6 5H9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
};

export default ProfileHeader;
