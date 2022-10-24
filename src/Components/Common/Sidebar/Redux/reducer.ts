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