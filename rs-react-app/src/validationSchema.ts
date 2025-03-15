import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required('Name is required'),

  age: yup.number().min(0, 'Age must be positive').required('Age is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[\W_]/, 'Must contain at least one special character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm Password is required'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Gender is required')
    .required('Gender is required'),
  country: yup.string().required('Country is required'),
  image: yup
    .string()
    .nullable()
    .test('fileSize', 'File is too large', (value) => {
      if (value && typeof value === 'string') {
        const matches = value.match(/^data:(image\/(jpeg|png));base64,/);
        if (matches && matches[0]) {
          const base64String = value.split(',')[1];
          const size = Math.round((base64String.length * (3 / 4)) / 1024);
          return size <= 5000;
        }
      }
    })
    .test('fileExtension', 'Unsupported file extension', (value) => {
      if (value && typeof value === 'string') {
        const matches = value.match(/^data:(image\/(jpeg|png));base64,/);
        return !!matches;
      }
      return false;
    }),
  agreement: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
});
