import { actionTypes } from "./types";

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


export const profileReducer = (state: any = initialState, action: any) => {
    const { type, payload } = action

    switch (type) {
        case actionTypes.GET_USER_PROFILE_FAILURE:
            return { ...state }

        default:
            return state
    }
}