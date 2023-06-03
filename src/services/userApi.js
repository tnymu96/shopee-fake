import axios from "./customize-axios";

const loginApi = (username, password) => {
    return axios.post(`/auth/login`, { username: username, password: password });
}

const getSingleUser = (id) => {
    return axios.get(`/users/${id}`);
}

export { loginApi, getSingleUser }