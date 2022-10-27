import axiosConfig from './AxiosConfig'
import {
  iGetAttributePayload,
  iCreateAttributePayload,
  iCreateChildAttrPayload,
  iUpdateAttr,
  iUpdateChildAttribute,
} from './../app/Models'

const attributeApis = {
  getAll: (payload: iGetAttributePayload) => {
    return axiosConfig.post('/product/get-attribute-created-by-brand', payload)
  },
  createAttribute: (payload: iCreateAttributePayload) => {
    return axiosConfig.post('/product/create-product-attributes-brand', payload)
  },
  createChildAttribute: (payload: iCreateChildAttrPayload) => {
    return axiosConfig.post('/product/create-terms-product-attribute', payload)
  },
  updateAttribute: (payload: iUpdateAttr) => {
    return axiosConfig.post('/product/update-attribute', payload)
  },
  updateChildAttribute: (payload: iUpdateChildAttribute) => {
    return axiosConfig.post('/product/update-attribute-term', payload)
  },
}

export default attributeApis
