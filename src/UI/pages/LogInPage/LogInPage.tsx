import { useState, type SubmitEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';
import styles from './LoginPage.module.css';

const LogInPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (formEvent) => {
    formEvent.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await authService.login(login, password);
      navigate('/workspace');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Login error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="login-username">Email</label>
        <input
          id="login-username"
          type="text"
          placeholder="Enter your email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className={styles.prompt}>
          Not Signed In?{' '}
          <Link to="/register" className={styles.link}>
            Sign In
          </Link>
        </p>
        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <div className={errorMessage ? styles.error : styles.errorPlaceholder} aria-live="polite" role="alert">
        {errorMessage || '\u00A0'}
      </div>
    </div>
  );
};

export default LogInPage;