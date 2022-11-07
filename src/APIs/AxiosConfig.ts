import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

interface iLiveUrl {
    [key: string]: string
}

const devBaseUrl: string = 'https://addin-sg.lotustest.net/wp-json/addin-seller/v1'

const liveBaseUrl: iLiveUrl = {
    'SG': 'https://aws.addin.sg/wp-json/addin-seller/v1'
}

const appMode = process.env.REACT_APP_MODE
const location: string = process.env.REACT_APP_LOCATION || 'SG'

const axiosConfig = axios.create({
    baseURL: appMode === 'DEV' ? devBaseUrl : liveBaseUrl[location],
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
    return response
}, function (error) {
    return Promise.reject(error)
})

export default axiosConfig;