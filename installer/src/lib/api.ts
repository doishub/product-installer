import axios, {type AxiosInstance} from "axios";

const api: AxiosInstance = axios.create({
    baseURL: '/contao/api/',
    responseType: 'json'
});

const manager_api: AxiosInstance = axios.create({
    baseURL: '/contao/api/contao_manager/',
    responseType: 'json',
    /*headers: {
        'Authorization': `bearer ${getToken()}`
    }*/
});

// Intercept errors
api.interceptors.response.use(resp => resp, async error => {

    // Handle errors
    if (error?.response?.status === 401 || error?.code === 'ERR_NETWORK') {

    }

    console.log(error?.response?.status)

    return error
});

const post = (route: string, parameter = {}) => {
    return api.post(route, parameter)
}

const get = (route: string, parameter = {}) => {
    return api.get(route, {
        params: parameter
    })
}

export {
    api,
    manager_api,
    post,
    get
};
