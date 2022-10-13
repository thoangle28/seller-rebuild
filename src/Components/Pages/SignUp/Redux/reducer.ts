import { actionTypes } from "./types"

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
    message: ''
}

export const registerReducer = (state: any = initialState, action: any) => {
    const { type, payload } = action
    switch (type) {
        case actionTypes.REGISTER_FAILURE:
            return { ...state, ...requestFailure, message: payload }
        case actionTypes.REGISTER_REQUEST:
            return { ...state, ...requestLoading }
        case actionTypes.REGISTER_SUCCESS:
            return { ...state, ...requestSuccess, message: payload }
         
        default:
            return state
    }
}