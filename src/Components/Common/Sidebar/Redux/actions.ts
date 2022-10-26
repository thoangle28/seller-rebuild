import loginApi from "APIs/LoginApi"
import { iUserProfile } from "app/Models"
import { actionTypes } from "./types"

const getUserProfileSuccess = (payload: any) => ({
    type: actionTypes.GET_USER_PROFILE_SUCCESS,
    payload
})
const getUserProfileFailure = (payload: string) => ({
    type: actionTypes.GET_USER_PROFILE_FAILURE,
    payload
})
const getUserProfileRequest = () => ({
    type: actionTypes.GET_USER_PROFILE_REQUEST
})

export const getUserProfile = (payload: iUserProfile) => async (dispatch: any) => {
    dispatch(getUserProfileRequest())
    try {
        const response = await loginApi.getUserProfileById(payload)
        const { data, code, message } = response.data
        if (code === 200) {
            dispatch(getUserProfileSuccess(data))
        } else {
            dispatch(getUserProfileFailure(message))
        }
    } catch (error) {
        dispatch(getUserProfileSuccess(error.message)) 
    }
}