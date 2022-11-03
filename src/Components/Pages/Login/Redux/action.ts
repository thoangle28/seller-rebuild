import loginApi from 'APIs/LoginApi'
import actionTypes from './types'
import { iLogin, iVerifyToken } from 'app/Models'

const loginFailure = (payload: string) => ({
    type: actionTypes.LOGIN_FAILURE,
    payload
})

const loginSuccess = (payload: any) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload
})

const loginRequest = () => ({
    type: actionTypes.LOGIN_REQUEST,
})

const logoutAction = () => ({
    type: actionTypes.LOGOUT,
})

const verifyTokenSuccess = () => ({
    type: actionTypes.VERIFY_TOKEN_SUCCESS,
})
const verifyTokenFailure = () => ({
    type: actionTypes.VERIFY_TOKEN_FAILURE,
})
const verifyTokenRequest = () => ({
    type: actionTypes.VERIFY_TOKEN_REQUEST
})

const isLogin = (payload: boolean = false) => ({
    type: actionTypes.IS_LOGIN,
    payload
})

export const verifyToken = (payload: iVerifyToken) => async (dispatch: any) => {
    dispatch(verifyTokenRequest())
    try {
        const response = await loginApi.verifyToken(payload)
        const { code } = response.data
        if (code === 200) {
            dispatch(verifyTokenSuccess())
        } else {
            dispatch(verifyTokenFailure())
            dispatch(isLogin(false))
        }
    } catch (error) {
        dispatch(verifyTokenFailure())
        dispatch(isLogin(false))
    }
}

// Login action
export const login = (formValue: iLogin, navigate: any) => async (dispatch: any) => {
    dispatch(loginRequest())
    try {
        const response: any = await loginApi.login(formValue)
        const { data, code, message } = response.data

        if (code === 200 && !message) {
            dispatch(loginSuccess(data))
            navigate('/dashboard')
            dispatch(isLogin(true))
        } else {
            dispatch(loginFailure(message))
        }
    } catch (err) {
        dispatch(loginFailure(err))
    }
}

// Logout action
export const logout = () => async (dispatch: any) => {
    dispatch(logoutAction())
    dispatch(isLogin(false))
    window.localStorage.clear()
}