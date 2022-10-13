import * as yup from 'yup'

const pwdRule = /^(?=.*?[A-Z])(?=.*?[0-9]).{3,}$/
const LoginSchema = yup.object().shape({
  username: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(3)
    .matches(pwdRule, 'Invalid password')
    .required('Password is required'),
})

export default LoginSchema
