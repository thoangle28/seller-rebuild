import * as yup from 'yup'

const pwdRule = /^(?=.*?[A-Z])(?=.*?[0-9]).{3,}$/
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const SettingsProfileSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  brandName: yup.string().required('Brand name is required'),
  contactEmail: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  contactPhone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  address: yup.string().required('Address is required'),
})

const ResetPasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(3)
    .matches(pwdRule, 'Invalid password')
    .required('Current password is required'),
  newPassword: yup
    .string()
    .min(3)
    .matches(pwdRule, 'Invalid password')
    .required('Password is required'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
})

export {ResetPasswordSchema}
export default SettingsProfileSchema
