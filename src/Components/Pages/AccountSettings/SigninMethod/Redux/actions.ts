import axiosConfig from 'APIs/AxiosConfig'
import {iChangePassword} from 'app/Models/profile.interface'
import actionTypes from './type'

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
