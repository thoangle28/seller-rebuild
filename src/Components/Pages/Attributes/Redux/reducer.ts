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
  attributeList: [],
  message: '',
}

export const attributesReducer = (state: any = initialState, action: any) => {
  const { type, payload } = action
  switch (type) {

    case actionTypes.GET_ATTRIBUTE_LIST_FAILURE:
      return { ...state, ...requestFailure, message: payload }
    case actionTypes.GET_ATTRIBUTE_LIST_REQUEST:
      return { ...state, ...requestLoading }
    case actionTypes.GET_ATTRIBUTE_LIST_SUCCESS:
      return { ...state, ...requestSuccess, attributeList: payload }

    case actionTypes.CREATE_NEW_ATTRIBUTE_FAILURE:
      return { ...state, ...requestFailure, message: payload }
    case actionTypes.CREATE_NEW_ATTRIBUTE_REQUEST:
      return { ...state, ...requestLoading }
    case actionTypes.CREATE_NEW_ATTRIBUTE_SUCCESS:
      return { ...state, ...requestSuccess }

    case actionTypes.CREATE_NEW_CHILDREN_ATTRIBUTE_FAILURE:
      return { ...state, ...requestFailure, message: payload }
    case actionTypes.CREATE_NEW_CHILDREN_ATTRIBUTE_REQUEST:
      return { ...state, ...requestLoading }
    case actionTypes.CREATE_NEW_CHILDREN_ATTRIBUTE_SUCCESS:
      return { ...state, ...requestSuccess, message: payload }

    default:
      return state
  }
}
