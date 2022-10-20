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
  const {type, payload, parent_id} = action
  switch (type) {
    case actionTypes.GET_ATTRIBUTE_LIST_FAILURE:
      return {...state, ...requestFailure, message: payload}

    case actionTypes.GET_ATTRIBUTE_LIST_REQUEST:
      return {...state, ...requestLoading}

    case actionTypes.GET_ATTRIBUTE_LIST_SUCCESS:
      return {...state, ...requestSuccess, attributeList: payload}

    case actionTypes.CREATE_NEW_ATTRIBUTE_FAILURE:
      return {...state, ...requestFailure, message: payload}

    case actionTypes.CREATE_NEW_ATTRIBUTE_REQUEST:
      return {...state, ...requestLoading}

    case actionTypes.CREATE_NEW_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        ...requestSuccess,
        attributeList: [payload, ...state.attributeList],
        message: payload,
      }

    case actionTypes.CREATE_NEW_CHILDREN_ATTRIBUTE_FAILURE:
      return {...state, ...requestFailure, message: payload}

    case actionTypes.CREATE_NEW_CHILDREN_ATTRIBUTE_REQUEST:
      return {...state, ...requestLoading}

    case actionTypes.CREATE_NEW_CHILDREN_ATTRIBUTE_SUCCESS:
      const findParentAttribute = state.attributeList.filter(
        (attribute: any) => attribute.name === payload.attr
      )

      console.log(findParentAttribute)

      return {
        ...state,
        ...requestSuccess,
        attributeList: [...state.attributeList, payload],
      }
    default:
      return state
  }
}
