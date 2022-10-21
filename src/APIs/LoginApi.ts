import axiosConfig from './AxiosConfig'
import { iLogin, iVerifyToken } from 'app/Models'

const loginApi = {
  login: (payload: iLogin) => {
    return axiosConfig.post('/login', payload)
  },
  verifyToken: (payload: iVerifyToken) => {
    return axiosConfig.post('/verify_token', payload)
  }
}

export default loginApi
