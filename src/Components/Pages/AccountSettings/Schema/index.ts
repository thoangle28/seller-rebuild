import * as yup from 'yup'

const pwdRule = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}$/

const SettingsProfileSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  brandName: yup.string().required('Brand name is required'),
  contactEmail: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  contactPhone: yup
    .number()
    .positive('Phone number is not valid')
    .min(10, 'Phone number at least 10 digits')
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
    .oneOf([yup.ref('newPassword'), null], 'Confirm new password must match')
    .required('Confirm new password is required'),
})

export {ResetPasswordSchema, SettingsProfileSchema}
