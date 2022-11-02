import * as yup from 'yup'

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

export {SettingsProfileSchema}
