import axiosConfig from 'APIs/AxiosConfig'
import {
  iChangePassword,
  iGetInfoUser,
} from './../../../../app/Models/profile.interface'
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

const changeAvatarRequest = () => ({
  type: actionTypes.CHANGE_AVATAR_REQUEST,
})

const changeAvatarFailure = (payload: string) => ({
  type: actionTypes.CHANGE_AVATAR_FAILURE,
  payload,
})

const changeAvatarSuccess = (payload: string) => ({
  type: actionTypes.CHANGE_AVATAR_SUCCESS,
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

const changePasswordRequest = () => ({
  type: actionTypes.CHANGE_PASSWORD_REQUEST,
})

const changePasswordFailure = (payload: string) => ({
  type: actionTypes.CHANGE_PASSWORD_FAILURE,
  payload,
})

const changePasswordSuccess = (payload: any) => ({
  type: actionTypes.CHANGE_PASSWORD_SUCCESS,
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

export const changeAvatar = (payload: any) => async (dispatch: any) => {
  dispatch(changeAvatarRequest())
  try {
    const endPoint = '/user/profile/update'
    const res = await axiosConfig.post(endPoint, payload)

    const {code, message} = res.data

    code === 200
      ? dispatch(changeAvatarSuccess(message))
      : dispatch(changeAvatarFailure(message))
  } catch (error) {
    dispatch(changeAvatarFailure(error.message))
  }
}

export const editInfoUser = (payload: any) => async (dispatch: any) => {
  dispatch(editInfoUserRequest())

  try {
    const endPoint = '/user/profile/update'
    const res = await axiosConfig.post(endPoint, payload)

    const {code, message} = res.data

    code === 200
      ? dispatch(editInfoUserSuccess(message))
      : dispatch(editInfoUserFailure(message))
  } catch (error) {
    dispatch(editInfoUserFailure(error.message))
  }
}

export const changePassword =
  (payload: iChangePassword) => async (dispatch: any) => {
    dispatch(changePasswordRequest())

    try {
      const endPoint = '/user/profile/change-password'

      const res = await axiosConfig.post(endPoint, payload)
      const {code, message} = res.data

      code === 200
        ? dispatch(changePasswordSuccess(message))
        : dispatch(changePasswordFailure(message))
    } catch (error) {
      dispatch(changePasswordFailure(error.message))
    }
  }

export const deleteMessage = () => async (dispatch: any) => {
  dispatch(removeMessage())
}
