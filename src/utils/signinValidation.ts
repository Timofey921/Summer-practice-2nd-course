import * as yup from 'yup';
import { MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from './validation';

export const signinSchema = yup.object({
  login: yup
    .string()
    .email('Invalid email')
    .min(
      MIN_LOGIN_LENGTH,
      `The login must be at least ${MIN_LOGIN_LENGTH} characters long`
    )
    .required('Email is required'),

  password: yup
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `The password must be at least ${MIN_PASSWORD_LENGTH} characters long`
    )
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords don't match")
    .required('Please confirm your password'),
});