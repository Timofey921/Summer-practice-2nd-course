import { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../../../services/authService';
import styles from './WelcomeHeader.module.css';

const WelcomeHeader = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        const isValid = await authService.validate();
        setIsAuthenticated(isValid);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ): void => {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink}>
          <svg className={styles.logoMark} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 24C10 24 10 8 16 8C22 8 22 24 28 24" stroke="var(--route)" strokeWidth="2.5" strokeDasharray="1 6" strokeLinecap="round" />
            <circle cx="4" cy="24" r="3" fill="var(--navy)" />
            <circle cx="28" cy="24" r="3" fill="var(--route)" />
          </svg>
          <span className={styles.logoWord}>Big Trip</span>
        </Link>

        <nav className={styles.navLinks}>
          <a href="#about" onClick={(e) => handleAnchorClick(e, 'about')}>About</a>
          <a href="#contacts" onClick={(e) => handleAnchorClick(e, 'contacts')}>Contacts</a>
        </nav>

        <div className={styles.authButtons}>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className={styles.profileLink} aria-label="Personal account">
                <img src="/img/user.svg" alt="" className={styles.avatarIcon} />
              </Link>
              <Link to="/workspace" className={styles.primaryBtn}>
                To planning
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin" className={styles.primaryBtn}>
                Sign In
              </Link>
              <Link to="/login" className={styles.secondaryBtn}>
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default WelcomeHeader;
