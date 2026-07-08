import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { InferType } from 'yup';
import { loginSchema } from '../../../utils/loginValidation';
import authService from '../../../services/authService';
import styles from './LoginPage.module.css';

type LoginFormData = InferType<typeof loginSchema>;

const LogInPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const {register, handleSubmit, formState: { errors, isSubmitting },} = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError('');

    try {
      await authService.login(data.login, data.password);
      navigate('/workspace');
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'Login error'
      );
    }
  };

  return (
    <div className={styles.page}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          placeholder="Enter your email"
          {...register('login')}
        />

        {errors.login && (
          <span className={styles.error}>
            {errors.login.message}
          </span>
        )}

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
        />

        {errors.password && (
          <span className={styles.error}>
            {errors.password.message}
          </span>
        )}

        <p className={styles.prompt}>
          Not Signed In?{' '}
          <Link to="/signin" className={styles.link}>
            Sign In
          </Link>
        </p>

        <button type="submit" className={styles.btn} disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Login'}
        </button>
      </form>

      {serverError && (
        <div className={styles.error} role="alert">
          {serverError}
        </div>
      )}
    </div>
  );
};

export default LogInPage;