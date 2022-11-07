import actionTypes from './types'

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
  infoUser: {},
}

export const profileReducer = (state: any = initialState, action: any) => {
  const {type, payload} = action
  switch (type) {
    case actionTypes.GET_INFO_USER_REQUEST:
      return {...state, ...requestLoading}
    case actionTypes.GET_INFO_USER_FAILURE:
      return {...state, ...requestFailure, message: payload}
    case actionTypes.GET_INFO_USER_SUCCESS:
      return {...state, ...requestSuccess, infoUser: payload}

    case actionTypes.DELETE_MESSAGE:
      return {...state, message: ''}
    default:
      return state
  }
}
