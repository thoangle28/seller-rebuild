import actionTypes from "./types";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

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
    message: '',
    isLogin: false
}

export const loginReducer = persistReducer(
    { storage, key: 'profile', whitelist: ['user', 'accessToken', 'expireDate'] },
    (state: any = initialState, action: any) => {
        const { type, payload } = action
        switch (type) {
            case actionTypes.LOGIN_FAILURE:
                return { ...state, ...requestFailure, message: payload }
            case actionTypes.LOGIN_REQUEST:
                return { ...state, ...requestLoading }
            case actionTypes.LOGIN_SUCCESS:
                const accessToken = action.payload?.access_token
                const expireDate = action.payload?.expire_date
                const user = action.payload?.user

                return { ...state, ...requestSuccess, accessToken, expireDate, user }
            case actionTypes.LOGOUT:
                return { ...state, isLogin: payload, user: {}, accessToken: '' }

            case actionTypes.VERIFY_TOKEN_FAILURE:
                return { ...state, ...requestFailure }
            case actionTypes.VERIFY_TOKEN_REQUEST:
                return { ...state, ...requestLoading }
            case actionTypes.VERIFY_TOKEN_SUCCESS:
                return { ...state, ...requestSuccess }
            case actionTypes.IS_LOGIN:
                return { ...state, isLogin: payload }
            case actionTypes.CLEAR_MESSAGE:
                return { ...state, message: payload }
            default:
                return state
        }
    })