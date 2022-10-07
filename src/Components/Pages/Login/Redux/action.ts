import loginApi from 'APIs/LoginApi'
import actionTypes from './types'

export const add = (payload: number) => ({
    type: actionTypes.ADD,
    payload
})

const getDataFailure = () => ({
    type: actionTypes.CALLING_API_FAILURE
})

const getDataRequest = () => ({
    type: actionTypes.CALLING_API_REQUEST
})

const getDataSuccess = (payload: any) => ({
    type: actionTypes.CALLING_API_SUCCESS,
    payload
})

export const getData = async (dispatch: any) => {
    dispatch(getDataRequest());
    try { 
        const data: any = await loginApi.getAll()
        data ? dispatch(getDataSuccess(data)) : dispatch(getDataFailure())
    } catch {
        dispatch(getDataFailure());
    }
}