import axiosConfig from './AxiosConfig'
import { iLogin } from 'app/Models'

const loginApi = {
  login: (payload: iLogin) => {
    return axiosConfig.post('/login', payload)
  }
}

export default loginApi
