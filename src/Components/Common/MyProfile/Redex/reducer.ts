import actionTypes from './type'

const request = {
  isSuccess: false,
  isFailure: false,
  isLoading: false,
}

const requestSuccess = {
  ...request,
  isSuccess: true,
}

const requestFailure = {
  ...request,
  isFailure: true,
}

const requestLoading = {
  ...request,
  isLoading: true,
}

const initialState = {
  ...request,
  message: '',
}

export const changeAvatarReducer = (state: any = initialState, action: any) => {
  const {type, payload} = action
  switch (type) {
    case actionTypes.CHANGE_AVATAR_REQUEST:
      return {...state, ...requestLoading}
    case actionTypes.CHANGE_AVATAR_FAILURE:
      return {...state, ...requestFailure, message: payload}
    case actionTypes.CHANGE_AVATAR_SUCCESS:
      return {...state, ...requestSuccess, message: payload}
    case actionTypes.DELETE_MESSAGE:
      return {...state, message: ''}
    default:
      return state
  }
}
