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
    number: 0,
    data: []
}

export const loginReducer = (state: any = initialState, action: any) => {
    const { type, payload } = action
    switch (type) {
        case actionTypes.ADD:
            return { ...state, number: state.number + payload }

        case actionTypes.CALLING_API_FAILURE:
            return { ...state, ...requestFailure }
        case actionTypes.CALLING_API_REQUEST:
            return { ...state, ...requestLoading }
        case actionTypes.CALLING_API_SUCCESS:
            return { ...state, ...requestSuccess, data: payload }

        default:
            return state
    }
}