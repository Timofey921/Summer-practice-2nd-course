import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { InferType } from 'yup';
import { useAuth } from '../../../context/useAuth';
import { signinSchema } from '../../../utils/signinValidation';
import styles from './SignInPage.module.css';

type SignInFormData = InferType<typeof signinSchema>;

const SignInPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [serverError, setServerError] = useState('');
  const {register, handleSubmit, formState: { errors, isSubmitting },} = useForm<SignInFormData>({
    resolver: yupResolver(signinSchema),
    defaultValues: {
      login: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setServerError('');

    try {
      await signUp({ login: data.login, password: data.password });
      navigate('/workspace');
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'Sign In error'
      );
    }
  };

  return (
    <div className={styles.page}>
      <h1>Sign In</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <label htmlFor="signup-login">
          Email
        </label>
        <input
          id="signup-login"
          type="email"
          placeholder="Enter your email"
          {...register('login')}
        />

        {errors.login && (
          <span className={styles.error}>
            {errors.login.message}
          </span>
        )}

        <label htmlFor="signup-password">
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
        />

        {errors.password && (
          <span className={styles.error}>
            {errors.password.message}
          </span>
        )}

        <label htmlFor="signup-confirm-password">
          Repeat the password
        </label>
        <input
          id="signup-confirm-password"
          type="password"
          placeholder="Confirm the password"
          {...register('confirmPassword')}
        />

        {errors.confirmPassword && (
          <span className={styles.error}>
            {errors.confirmPassword.message}
          </span>
        )}

        <p className={styles.prompt}>
          Already Signed In?{' '}
          <Link to="/login"className={styles.link}>
            Login
          </Link>
        </p>

        <button type="submit" className={styles.btn} disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Sign In'}
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

export default SignInPage;
