import axiosConfig from './AxiosConfig'
import { iLogin, iUserProfile, iUserUpdate, iVerifyToken } from 'app/Models'

const loginApi = {
  login: (payload: iLogin) => {
    return axiosConfig.post('/login', payload)
  },
  verifyToken: (payload: iVerifyToken) => {
    return axiosConfig.post('/verify_token', payload)
  },
  getUserProfileById: (payload: iUserProfile) => {
    return axiosConfig.post('/user/profile', payload)
  }, 
  getUserProfileUpdate: (payload: iUserUpdate) => {
    return axiosConfig.post('/user/profile/update', payload)
  },


}

export default loginApi
