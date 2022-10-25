import attributeApis from 'APIs/Attributes'
import {
  iCreateAttributePayload,
  iCreateChildAttrPayload,
  iGetAttributePayload,
  iUpdateAttr,
  iUpdateChildAttribute,
} from 'app/Models'
import actionTypes from './types'

const getAttributesListRequest = () => ({
  type: actionTypes.GET_ATTRIBUTE_LIST_REQUEST,
})

const getAttributesListFailure = () => ({
  type: actionTypes.GET_ATTRIBUTE_LIST_FAILURE,
})

const getAttributesListSuccess = (payload: any) => ({
  type: actionTypes.GET_ATTRIBUTE_LIST_SUCCESS,
  payload,
})

const createNewAttributeRequest = () => ({
  type: actionTypes.CREATE_NEW_ATTRIBUTE_REQUEST,
})

const createNewAttributeFailure = (payload: string) => ({
  type: actionTypes.CREATE_NEW_ATTRIBUTE_FAILURE,
  payload,
})

const createNewAttributeSuccess = (payload: string) => ({
  type: actionTypes.CREATE_NEW_ATTRIBUTE_SUCCESS,
  payload,
})

const createNewChildrenAttributeRequest = () => ({
  type: actionTypes.CREATE_NEW_CHILDREN_ATTRIBUTE_REQUEST,
})

const createNewChildrenAttributeFailure = (payload: string) => ({
  type: actionTypes.CREATE_NEW_CHILDREN_ATTRIBUTE_FAILURE,
  payload,
})

const createNewChildrenAttributeSuccess = (payload: string) => ({
  type: actionTypes.CREATE_NEW_CHILDREN_ATTRIBUTE_SUCCESS,
  payload,
})

const updateAttrSuccess = (payload: string) => ({
  type: actionTypes.UPDATE_ATTRIBUTE_SUCCESS,
  payload,
})
const updateAttrFailure = (payload: string) => ({
  type: actionTypes.UPDATE_ATTRIBUTE_FAILURE,
  payload,
})
const updateAttrRequest = () => ({
  type: actionTypes.UPDATE_ATTRIBUTE_REQUEST,
})

const updateChildAttrSuccess = (payload: string) => ({
  type: actionTypes.UPDATE_CHILDREN_ATTRIBUTE_SUCCESS,
  payload,
})

const updateChildAttrFailure = (payload: string) => ({
  type: actionTypes.UPDATE_CHILDREN_ATTRIBUTE_FAILURE,
  payload,
})

const updateChildAttrRequest = () => ({
  type: actionTypes.UPDATE_CHILDREN_ATTRIBUTE_REQUEST,
})

const isUpdateMode = (payload: boolean) => ({
  type: actionTypes.IS_UPDATE_FORM,
  payload,
})

const deleteMess = () => ({
  type: actionTypes.DELETE_MESSAGE,
})

export const getAttributeList =
  (formData: iGetAttributePayload) => async (dispatch: any) => {
    dispatch(getAttributesListRequest())
    try {
      const response = await attributeApis.getAll(formData)
      const {code, data} = response.data

      code === 200
        ? dispatch(getAttributesListSuccess(data))
        : dispatch(getAttributesListFailure())
    } catch (error) {
      dispatch(getAttributesListFailure())
    }
  }

export const createNewAttribute =
  (formData: iCreateAttributePayload, getAllPayload: iGetAttributePayload) =>
  async (dispatch: any) => {
    dispatch(createNewAttributeRequest())
    try {
      const response = await attributeApis.createAttribute(formData)
      const {code, message} = response.data
      if (code === 200) {
        dispatch(createNewAttributeSuccess(message))
        dispatch(getAttributeList(getAllPayload))
      } else {
        dispatch(createNewAttributeFailure(message))
      }
    } catch (err) {
      dispatch(createNewAttributeFailure(err.message))
    }
  }

export const createNewChildrenAttribute =
  (payload: iCreateChildAttrPayload, getAllPayload: iGetAttributePayload) =>
  async (dispatch: any) => {
    dispatch(createNewChildrenAttributeRequest())

    try {
      const response = await attributeApis.createChildAttribute(payload)
      const {code, message} = response.data
      if (code === 200) {
        dispatch(createNewChildrenAttributeSuccess(message))
        dispatch(getAttributeList(getAllPayload))
      } else {
        dispatch(createNewChildrenAttributeFailure(message))
      }
    } catch (error) {
      dispatch(createNewChildrenAttributeFailure(error.message))
    }
  }

export const updateAttribute =
  (formData: iUpdateAttr, getAllPayload: iGetAttributePayload) =>
  async (dispatch: any) => {
    dispatch(updateAttrRequest())
    try {
      const response = await attributeApis.updateAttribute(formData)
      const {message, code} = response.data
      if (code === 200) {
        dispatch(updateAttrSuccess(message))
        dispatch(getAttributeList(getAllPayload))
        dispatch(changeUpdateMode(false))
      } else {
        dispatch(updateAttrFailure(message))
      }
    } catch (error) {
      dispatch(updateAttrFailure(error.message))
    }
  }

export const updateChildAttr =
  (formData: iUpdateChildAttribute, getAllPayload: iGetAttributePayload) =>
  async (dispatch: any) => {
    dispatch(updateChildAttrRequest())
    try {
      const response = await attributeApis.updateChildAttribute(formData)
      const {message, code} = response.data
      if (code === 200) {
        dispatch(updateChildAttrSuccess(message))
        dispatch(getAttributeList(getAllPayload))
        dispatch(changeUpdateMode(false))
      } else {
        dispatch(updateChildAttrFailure(message))
      }
    } catch (err) {
      dispatch(updateChildAttrFailure(err.message))
    }
  }

export const changeUpdateMode = (payload: boolean) => async (dispatch: any) => {
  dispatch(isUpdateMode(payload))
}

export const deleteMessage = () => async (dispatch: any) => {
  dispatch(deleteMess())
}
