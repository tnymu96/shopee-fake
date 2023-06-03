import axios from "./customize-axios";

const getAllProducts = () => {
    return axios.get(`/products`);
}

const getSingleProduct = (id) => {
    return axios.get(`/products/${id}`);
}

export { getAllProducts, getSingleProduct }