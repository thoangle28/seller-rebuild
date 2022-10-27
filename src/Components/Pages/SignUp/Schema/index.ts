import * as yup from 'yup'

const pwdRule = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}$/
const SignUpSchema = yup.object().shape({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  brand: yup.string().required('Brand name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .matches(
      pwdRule,
      'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character.'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Confirm password must match')
    .required('Confirm password is required'),
})

export default SignUpSchema
