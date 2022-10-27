import * as yup from 'yup'

const pwdRule = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}$/
const LoginSchema = yup.object().shape({
  username: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .matches(
      pwdRule,
      'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character.'
    )
    .required('Password is required'),
})

export default LoginSchema
