import axiosConfig from 'APIs/AxiosConfig'
import actionTypes from './type'

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

export const changeAvatar = (payload: any) => async (dispatch: any) => {
  dispatch(changeAvatarRequest)
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
