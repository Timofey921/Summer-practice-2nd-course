import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import authService from '../../../../services/authService';
import styles from './HeroComp.module.css';

const HeroComp = () => {
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

  return (
    <section className={styles.section}>
      <svg className={styles.routeLine} viewBox="0 0 1200 520" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M-40 120 C 220 20, 340 260, 560 190 S 940 40, 1240 160"
          stroke="var(--route)"
          strokeWidth="2"
          strokeDasharray="2 10"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="220" cy="63" r="4" fill="var(--navy)" />
        <circle cx="560" cy="190" r="4" fill="var(--route)" />
        <circle cx="940" cy="65" r="4" fill="var(--navy)" />
      </svg>

      <div className={styles.content}>
        <h1 className={styles.title}>Big Trip</h1>
        <p className={styles.subtitle}>
          Plan your route by day, calculate your trip budget, 
          and keep the vacation itself in focus.
        </p>

        {isAuthenticated ? (
          <Link to="/workspace" className={styles.btn}>
            To planning
          </Link>
        ) : (
          <Link to="/signin" className={styles.btn}>
            Sign In
          </Link>
        )}
      </div>
    </section>
  );
};

export default HeroComp;
