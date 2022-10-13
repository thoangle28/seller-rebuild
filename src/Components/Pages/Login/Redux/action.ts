import loginApi from 'APIs/LoginApi'
import actionTypes from './types'
import { iLogin } from 'app/Models'

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

// Login action
export const login = (formValue: iLogin, navigate: any) => async (dispatch: any) => {
    dispatch(loginRequest())
    try {
        const response: any = await loginApi.login(formValue)
        const { data, code, message } = response.data
        const { user } = data
        if (code === 200 && !message) {
            dispatch(loginSuccess(user))
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
    dispatch(logoutAction)
}