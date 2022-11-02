import * as yup from 'yup'
const pwdRule = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}$/

const ResetPasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .matches(pwdRule, 'Current password is not valid')
    .required('Current password is required'),
  newPassword: yup
    .string()
    .matches(pwdRule, 'New password is not valid')
    .required('New password is required'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Confirm new password must match')
    .required('Confirm new password is required'),
})

export default ResetPasswordSchema
