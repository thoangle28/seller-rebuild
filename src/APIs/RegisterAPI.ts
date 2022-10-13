import axiosConfig from "./AxiosConfig";
import { iRegister } from "app/Models";

export const registerApi = {
    register: (formValue: iRegister) => {
        return axiosConfig.post('/register', formValue)
    }
}