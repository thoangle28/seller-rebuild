import {attributesReducer} from './reducer'
import {useAppSelector} from './../../../../app/Hooks/hooks'
import axiosConfig from 'APIs/AxiosConfig'
import actionTypes from './types'

const getAttributesListRequest = () => ({
  type: actionTypes.GET_ATTRIBUTE_LIST_REQUEST,
})

const getAttributesListFailure = (message: string) => ({
  type: actionTypes.GET_ATTRIBUTE_LIST_FAILURE,
  payload: message,
})

const getAttributesListSuccess = (payload: any) => ({
  type: actionTypes.GET_ATTRIBUTE_LIST_SUCCESS,
  payload,
})

const createNewAttributeRequest = () => ({
  type: actionTypes.CREATE_NEW_ATTRIBUTE_REQUEST,
})

const createNewAttributeFailure = (message: string) => ({
  type: actionTypes.CREATE_NEW_ATTRIBUTE_FAILURE,
  payload: message,
})

const createNewAttributeSuccess = (payload: any, message?: string) => ({
  type: actionTypes.CREATE_NEW_ATTRIBUTE_SUCCESS,
  payload,
})

const createNewChildrenAttributeRequest = () => ({
  type: actionTypes.CREATE_NEW_CHILDREN_ATTRIBUTE_REQUEST,
})

const createNewChildrenAttributeFailure = (message: string) => ({
  type: actionTypes.CREATE_NEW_CHILDREN_ATTRIBUTE_FAILURE,
})

const createNewChildrenAttributeSuccess = (payload: any, message?: string) => ({
  type: actionTypes.CREATE_NEW_CHILDREN_ATTRIBUTE_SUCCESS,
  payload,
})

export const getAttributeList =
  (user_id: any, access_token: any) => async (dispatch: any) => {
    dispatch(getAttributesListRequest())
    try {
      const endPoint = '/product/get-attribute-created-by-brand'
      const payload = {
        user_id,
        access_token,
      }

      const {data} = await axiosConfig.post(endPoint, payload)

      if (data.code === 200) {
        dispatch(getAttributesListSuccess(data.data))
      } else {
        dispatch(getAttributesListFailure(data.message))
      }
    } catch (error) {
      dispatch(getAttributesListFailure(error.message))
    }
  }

export const createNewAttribute =
  (payload: any, actions: any) => async (dispatch: any) => {
    dispatch(createNewAttributeRequest())

    try {
      const endPoint = '/product/create-product-attributes-brand'
      const {data} = await axiosConfig.post(endPoint, payload)

      if (data.code === 200) {
        dispatch(createNewAttributeSuccess(data.data, data.message))
        actions.resetForm()
      } else {
        dispatch(createNewAttributeFailure(data.message))
      }
    } catch (err) {
      dispatch(createNewAttributeFailure(err.message))
    } finally {
      actions.setSubmitting(false)
    }
  }

export const createNewChildrenAttribute =
  (payload: any, attributeList: any, actions: any) => async (dispatch: any) => {
    dispatch(createNewChildrenAttributeRequest())

    try {
      const endPoint = '/product/create-terms-product-attribute'
      const {data} = await axiosConfig.post(endPoint, payload)
      console.log(data.data)
      console.log(payload)

      if (data.code === 200) {
        const findParentAttribute = attributeList.find(
          (attribute: any) => attribute.id === Number(payload.parent_id)
        )

        const newChildrenAttributeList = {
          ...findParentAttribute,
          options: [...findParentAttribute.options, data.data],
        }

        dispatch(createNewChildrenAttributeSuccess(newChildrenAttributeList))
        actions.resetForm()
      } else {
        dispatch(createNewChildrenAttributeFailure(data.message))
      }
    } catch (error) {
      dispatch(createNewChildrenAttributeFailure(error.message))
    } finally {
      actions.setSubmitting(false)
    }
  }
