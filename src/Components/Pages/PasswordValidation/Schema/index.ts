import * as yup from 'yup'

const pwdRule = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}$/
const PasswordValidationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .matches(
      pwdRule,
      `Must contain 8 characters, one uppercase, one lowercase, one number and one special case character.`
    )
    .required('New password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
  resetToken: yup.string().required('Reset token is required'),
})

export default PasswordValidationSchema
