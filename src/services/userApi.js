import axios from "./customize-axios";

const loginApi = (email, password) => {
    return axios.post(`/login`, { email, password });
}

const getSingleUser = (id) => {
    return axios.get(`/users/${id}`);
}

export { loginApi, getSingleUser }