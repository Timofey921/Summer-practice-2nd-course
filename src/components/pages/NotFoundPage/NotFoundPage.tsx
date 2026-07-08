import { Link } from "react-router-dom";
import styles from './NotFoundPage.module.css'

const NotFoundPage = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>Page not found</h2>

    <p className={styles.text}>
      Oops! The page you're looking for doesn't exist.
    </p>

    <Link className={styles.link} to="/">
      Go Home
    </Link>
  </div>
);

export default NotFoundPage;