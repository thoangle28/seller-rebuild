import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosConfig = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json'
    }
})
axiosConfig.interceptors.request.use(function (config: AxiosRequestConfig) {
    return config
}, function (error) {
    return Promise.reject(error)
})

axiosConfig.interceptors.response.use(function (response: AxiosResponse) {
    return response.data
}, function (error) {
    return Promise.reject(error)
})

export default axiosConfig;