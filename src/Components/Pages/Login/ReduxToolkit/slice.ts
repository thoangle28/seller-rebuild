import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginApi from "APIs/LoginApi";
import { iLogin } from "app/Models";
import axios from "axios";

const URL = 'http://jsonplaceholder.typicode.com/users'

export const getData = createAsyncThunk('GET DATA', async () => {
    const res: any = await axios.get(URL)
    return res.data
})

export const signIn = (formData: iLogin, navigate: any) => async (dispatch: any) => {
    dispatch(getDataPending())
    try {
        const res: any = await loginApi.login(formData)
        const { data, code, message } = res.data
        if (code === 200) {
            dispatch(getDataFulilled(data))
            navigate('/dashboard')
        } else dispatch(getDataRejected(message))
    } catch (error) {
        dispatch(getDataRejected(error.message))
    }
}

interface state {
    status: 'pending' | 'fulfilled' | 'rejected',
    data: any[]
}

const initialState = {
    status: 'pending',
    data: [],
    user: {},
    message: ''
} as state

const getDataSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        getDataFulilled: (state, action) => {
            return { ...state, status: 'fulfilled', data: action.payload }
        },
        getDataRejected: (state, action) => {
            return { ...state, status: 'rejected', message: action.payload }
        },
        getDataPending: (state) => {
            return { ...state, status: 'pending' }
        }
    },
})
export const {
    getDataFulilled,
    getDataPending,
    getDataRejected,
} = getDataSlice.actions

export default getDataSlice