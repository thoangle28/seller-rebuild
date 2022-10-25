import * as yup from 'yup'

const createNewAttributeSchema = yup.object().shape({
  newAttribute: yup.string().required('Name is required'),
})

export const editChildrenAttr = yup.object().shape({
  new_attribute_term_name: yup.string().required('Name is required'),
})

export default createNewAttributeSchema
