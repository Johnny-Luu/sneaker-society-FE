import Axios from 'axios';

const API_URL = 'http://localhost:3001/product';

export const getAllProduct = () => {
     return Axios.get(API_URL).then(res => res.data);
};

export const getOneProduct = (id) => {
     return Axios.get(API_URL + `/${id}`).then(res => res.data);
};