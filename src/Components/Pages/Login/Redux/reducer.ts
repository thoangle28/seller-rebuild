import actionTypes from "./types";

const requestSuccess = {
    isSuccess: true,
    isFailure: false,
    isLoading: false,
}

const requestFailure = {
    isSuccess: false,
    isFailure: true,
    isLoading: false,
}

const requestLoading = {
    isSuccess: false,
    isFailure: false,
    isLoading: true,
}

const initialState = {
    isSuccess: false,
    isFailure: false,
    isLoading: false,
    user: {},
    message: ''
}

export const loginReducer = (state: any = initialState, action: any) => {
    const { type, payload } = action
    switch (type) {
        case actionTypes.LOGIN_FAILURE:
            return { ...state, ...requestFailure, message: payload }
        case actionTypes.LOGIN_REQUEST:
            return { ...state, ...requestLoading }
        case actionTypes.LOGIN_SUCCESS:
            return { ...state, ...requestSuccess, user: payload }
        case actionTypes.LOGOUT:
            return { ...state, user: {}, message: '' }

        case actionTypes.VERIFY_TOKEN_FAILURE:
            return { ...state, ...requestFailure }
        case actionTypes.VERIFY_TOKEN_REQUEST:
            return { ...state, ...requestLoading }
        case actionTypes.VERIFY_TOKEN_SUCCESS:
            return { ...state, ...requestSuccess, user: payload }
        default:
            return state
    }
}