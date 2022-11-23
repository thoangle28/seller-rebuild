import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginApi from "APIs/LoginApi";
import { iLogin } from "app/Models";
import axios from "axios";
import Signin from "..";

const URL = 'http://jsonplaceholder.typicode.com/users'

export const getData = createAsyncThunk('GET DATA', async () => {
    const res: any = await axios.get(URL)
    return res.data
})

export const signIn = createAsyncThunk("LOGIN", async (payload: iLogin , thunkAPI) => {
    console.log(thunkAPI)
    // const res: any = await loginApi.login(payload)
    // const { code, data } = res.data
     
    // return data;
})

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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state) => {
            return { ...state, status: 'pending' }
        });
        builder.addCase(getData.fulfilled, (state, action) => {
            return { ...state, status: 'fulfilled', data: action.payload }
        });
        builder.addCase(getData.rejected, (state) => {
            return { ...state, status: 'rejected' }
        })
        builder.addCase(signIn.pending, (state) => ({ ...state, status: 'pending' }));
        builder.addCase(signIn.fulfilled, (state, action) => ({ ...state, status: 'fulfilled', user: action.payload }))
        builder.addCase(signIn.rejected, (state, action) => ({ ...state, status: 'fulfilled', message: action.payload }))
    },
})

export default getDataSlice