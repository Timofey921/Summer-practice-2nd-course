import { useState, useRef, type SubmitEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from '../../utils/validation';
import styles from './SignInPage.module.css';

const SignInPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const loginRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (formEvent) => {
    formEvent.preventDefault();
    setErrorMessage('');

    if (login.length < MIN_LOGIN_LENGTH) {
      setErrorMessage(`The login must be at least ${MIN_LOGIN_LENGTH} characters long`);
      loginRef.current?.focus();
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setErrorMessage(`The password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords don\'t match');
      return;
    }

    setLoading(true);

    try {
      await authService.register(login, password);
      navigate('/workspace');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Sign In error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Sign In</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="signup-login">Email</label>
        <input
          id="signup-login"
          type="text"
          placeholder="Enter your email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          ref={loginRef}
          required
        />
        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="signup-confirm-password">Repeat the password</label>
        <input
          id="signup-confirm-password"
          type="password"
          placeholder="Confirm the password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          aria-required="true"
        />
        <p className={styles.prompt}>
          Already Signed In?{' '}
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </p>
        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className={errorMessage ? styles.error : styles.errorPlaceholder} role="alert">
        {errorMessage || '\u00A0'}
      </div>
    </div>
  );
};

export default SignInPage;