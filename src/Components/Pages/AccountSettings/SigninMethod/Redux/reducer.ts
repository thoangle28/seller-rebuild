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
  infoUser: [],
}

export const resetPasswordReducer = (
  state: any = initialState,
  action: any
) => {
  const {type, payload} = action
  switch (type) {
    case actionTypes.CHANGE_PASSWORD_REQUEST:
      return {...state, ...requestLoading}
    case actionTypes.CHANGE_PASSWORD_FAILURE:
      return {...state, ...requestFailure, message: payload}
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return {...state, ...requestSuccess, message: payload}

    case actionTypes.DELETE_MESSAGE:
      return {...state, ...requestFailure, message: ''}
    default:
      return state
  }
}
