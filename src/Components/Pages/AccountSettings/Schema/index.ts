import * as yup from 'yup'

const pwdRule = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}$/

const phoneRegExp = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
const SettingsProfileSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  brandName: yup.string().required('Brand name is required'),
  contactEmail: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  contactPhone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Contact phone is required'),
  address: yup.string().required('Address is required'),
})

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
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
})

export {ResetPasswordSchema, SettingsProfileSchema}
