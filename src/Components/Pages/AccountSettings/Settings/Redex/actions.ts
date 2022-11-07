import axiosConfig from 'APIs/AxiosConfig'
import actionTypes from './type'

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

export const deleteMessage = () => async (dispatch: any) => {
  dispatch(removeMessage())
}
