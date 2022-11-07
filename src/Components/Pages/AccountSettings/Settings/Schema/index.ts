import * as yup from 'yup'

// const phoneRegex = /(84[3|5|7|8|9]|0[3|5|7|8|9])+([0-9]{8})/
const phoneRegex =
  /^((\\+[1-9]{1,4}[\\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
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
    .matches(phoneRegex, 'Contact phone is not valid')
    .required('Contact phone is required'),
  address: yup.string().required('Address is required'),
})

export default SettingsProfileSchema
