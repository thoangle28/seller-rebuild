import * as yup from 'yup'

const pwdRule = /^(?=.*?[A-Z])(?=.*?[0-9]).{3,}$/
const PasswordValidationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(3)
    .matches(pwdRule, 'Invalid password')
    .required('New password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
  resetToken: yup.string().required('Reset token is required'),
})

export default PasswordValidationSchema
