import * as yup from 'yup';

export const loginSchema = yup.object({
  login: yup
    .string()
    .required('Email is required')
    .email('Invalid email'),

  password: yup
    .string()
    .required('Password is required'),
});
