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

export const editInfoUserReducer = (state: any = initialState, action: any) => {
  const {type, payload} = action
  switch (type) {
    case actionTypes.EDIT_INFO_USER_REQUEST:
      return {...state, ...requestLoading}
    case actionTypes.EDIT_INFO_USER_FAILURE:
      return {...state, ...requestFailure, message: payload}
    case actionTypes.EDIT_INFO_USER_SUCCESS:
      return {...state, ...requestSuccess, message: payload}

    case actionTypes.DELETE_MESSAGE:
      return {...state, ...requestFailure, message: ''}
    default:
      return state
  }
}
