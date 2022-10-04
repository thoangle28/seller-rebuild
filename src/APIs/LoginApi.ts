import axiosConfig from "./AxiosConfig";

const fetchData = (url: string, config: any) => {
    return config.post(url);
}

const loginApi = {
    getAll: () => fetchData('https://jsonplaceholder.typicode.com/users', axiosConfig)
}

export default loginApi;