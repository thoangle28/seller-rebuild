import { actionTypes } from "./types";
import { iRegister } from "app/Models";
import { registerApi } from "APIs/RegisterAPI";

const registerFailure = (message: string) => ({
    type: actionTypes.REGISTER_FAILURE,
    payload: message
})

const registerRequest = () => ({
    type: actionTypes.REGISTER_REQUEST
})

const registerSuccess = (payload: any) => ({
    type: actionTypes.REGISTER_SUCCESS,
    payload
})


export const register = (formValue: iRegister) => async (dispatch: any) => {
    dispatch(registerRequest())
    try {
        const response = await registerApi.register(formValue);
        const { data, message, code } = response.data
        code === 200 ? dispatch(registerSuccess(data)) : dispatch(registerFailure(message))
    } catch (error) {
        dispatch(registerFailure(error))
    }
}