import * as yup from 'yup'

const pwdRule = /^(?=.*?[A-Z])(?=.*?[0-9]).{3,}$/
const SignUpSchema = yup.object().shape({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  brand: yup.string().required('Brand name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(3)
    .matches(pwdRule, 'Invalid password')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
})

export default SignUpSchema
