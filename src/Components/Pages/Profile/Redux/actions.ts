import axiosConfig from 'APIs/AxiosConfig'
import {iGetInfoUser} from './../../../../app/Models/profile.interface'
import actionTypes from './types'

const getInfoUserRequest = () => ({
  type: actionTypes.GET_INFO_USER_REQUEST,
})

const getInfoUserFailure = (payload: string) => ({
  type: actionTypes.GET_INFO_USER_FAILURE,
  payload,
})

const getInfoUserSuccess = (payload: any) => ({
  type: actionTypes.GET_INFO_USER_SUCCESS,
  payload,
})

const editInfoUserRequest = () => ({
  type: actionTypes.EDIT_INFO_USER_REQUEST,
})

const editInfoUserFailure = (payload: string) => ({
  type: actionTypes.EDIT_INFO_USER_FAILURE,
  payload,
})

const editInfoUserSuccess = (payload: any) => ({
  type: actionTypes.EDIT_INFO_USER_SUCCESS,
  payload,
})

const removeMessage = () => ({
  type: actionTypes.DELETE_MESSAGE,
})

export const getInfoUser = (payload: iGetInfoUser) => async (dispatch: any) => {
  dispatch(getInfoUserRequest())

  try {
    const endPoint = '/user/profile'
    const res = await axiosConfig.post(endPoint, {user: payload})
    const {data, code, message} = res.data

    if (code === 200) {
      dispatch(getInfoUserSuccess(data))
    } else {
      dispatch(getInfoUserFailure(message))
    }
  } catch (error) {
    dispatch(getInfoUserFailure(error.message))
  }
}

export const editInfoUser = (payload: any) => async (dispatch: any) => {
  dispatch(editInfoUserRequest())

  try {
    const endPoint = '/user/profile/update'
    const res = await axiosConfig.post(endPoint, payload)
    console.log(res.data)
  } catch (error) {}
}

export const deleteMessage = () => async (dispatch: any) => {
  dispatch(removeMessage())
}
