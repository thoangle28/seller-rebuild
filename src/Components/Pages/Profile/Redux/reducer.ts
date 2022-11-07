import actionTypes from './types'

const request = {
  isSuccessGetInfo: false,
  isSuccessChangeAvatar: false,
  isSuccessSettings: false,
  isSuccessChangePassword: false,
  isFailureGetInfo: false,
  isFailureChangeAvatar: false,
  isFailureSettings: false,
  isFailureChangePassword: false,
  isLoadingGetInfo: false,
  isLoadingChangeAvatar: false,
  isLoadingSettings: false,
  isLoadingChangePassword: false,
}

const requestSuccessGetInfo = {
  ...request,
  isSuccessGetInfo: true,
}

const requestSuccessChangeAvatar = {
  ...request,
  isSuccessChangeAvatar: true,
}

const requestSuccessSettings = {
  ...request,
  isSuccessSettings: true,
}

const requestSuccessChangePassword = {
  ...request,
  isSuccessChangePassword: true,
}

const requestFailureGetInfo = {
  ...request,
  isFailureGetInfo: true,
}

const requestFailureChangeAvatar = {
  ...request,
  isFailureChangeAvatar: true,
}

const requestFailureSettings = {
  ...request,
  isFailureSettings: true,
}

const requestFailureChangePassword = {
  ...request,
  isFailureChangePassword: true,
}

const requestLoadingGetInfo = {
  ...request,
  isLoadingGetInfo: true,
}

const requestLoadingChangeAvatar = {
  ...request,
  isLoadingChangeAvatar: true,
}

const requestLoadingSettings = {
  ...request,
  isLoadingSettings: true,
}

const requestLoadingChangePassword = {
  ...request,
  isLoadingChangePassword: true,
}

const initialState = {
  ...request,
  message: '',
  infoUser: {},
}

export const profileReducer = (state: any = initialState, action: any) => {
  const {type, payload} = action
  switch (type) {
    case actionTypes.GET_INFO_USER_REQUEST:
      return {...state, ...requestLoadingGetInfo}
    case actionTypes.GET_INFO_USER_FAILURE:
      return {...state, ...requestFailureGetInfo, message: payload}
    case actionTypes.GET_INFO_USER_SUCCESS:
      return {...state, ...requestSuccessGetInfo, infoUser: payload}

    case actionTypes.CHANGE_AVATAR_REQUEST:
      return {...state, ...requestLoadingChangeAvatar}
    case actionTypes.CHANGE_AVATAR_FAILURE:
      return {...state, ...requestFailureChangeAvatar, message: payload}
    case actionTypes.CHANGE_AVATAR_SUCCESS:
      return {...state, ...requestSuccessChangeAvatar, message: payload}

    case actionTypes.EDIT_INFO_USER_REQUEST:
      return {...state, ...requestLoadingSettings}
    case actionTypes.EDIT_INFO_USER_FAILURE:
      return {...state, ...requestFailureSettings, message: payload}
    case actionTypes.EDIT_INFO_USER_SUCCESS:
      return {...state, ...requestSuccessSettings, message: payload}

    case actionTypes.CHANGE_PASSWORD_REQUEST:
      return {...state, ...requestLoadingChangePassword}
    case actionTypes.CHANGE_PASSWORD_FAILURE:
      return {...state, ...requestFailureChangePassword, message: payload}
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return {...state, ...requestSuccessChangePassword, message: payload}

    case actionTypes.DELETE_MESSAGE:
      return {...state, message: ''}
    default:
      return state
  }
}
