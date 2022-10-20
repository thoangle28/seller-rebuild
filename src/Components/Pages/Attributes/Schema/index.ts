import * as yup from 'yup'

const createNewAttributeSchema = yup.object().shape({
  newAttribute: yup.string().required('Name is required'),
})

export default createNewAttributeSchema
