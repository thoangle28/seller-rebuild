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
  productList: [],
}

export const tableReducer = (state: any = initialState, action: any) => {
  const {type, payload} = action
  switch (type) {
    case actionTypes.GET_PRODUCT_LIST_REQUEST:
      return {...state, ...requestLoading}
    case actionTypes.GET_PRODUCT_LIST_FAILURE:
      return {...state, ...requestFailure, message: payload}
    case actionTypes.GET_PRODUCT_LIST_SUCCESS:
      return {...state, ...requestSuccess, productList: payload}
    default:
      return state
  }
}
