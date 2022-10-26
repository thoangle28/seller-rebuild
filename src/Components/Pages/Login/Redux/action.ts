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

const verifyTokenSuccess = (payload?: any) => ({
    type: actionTypes.VERIFY_TOKEN_SUCCESS,
    payload
})
const verifyTokenFailure = () => ({
    type: actionTypes.VERIFY_TOKEN_FAILURE,
})
const verifyTokenRequest = () => ({
    type: actionTypes.VERIFY_TOKEN_FAILURE
})

export const verifyToken = (payload: iVerifyToken) => async (dispatch: any) => {
    dispatch(verifyTokenRequest())
    try {
        const response = await loginApi.verifyToken(payload)
        const { code, data } = response.data
        if (code === 200) {
            dispatch(verifyTokenSuccess(data))
        } else {
            dispatch(verifyTokenFailure())
        }
    } catch (error) {
        dispatch(verifyTokenFailure())
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
            localStorage.setItem('profile', JSON.stringify({ ...data }))
            navigate('/dashboard')
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
    window.localStorage.clear() 
}