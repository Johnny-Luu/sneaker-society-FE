import Axios from "axios";
import { API_ENDPOINT, BASE_URL } from "../constants/api-endpoint";

export const getAllProduct = async () => {
  const res = await Axios.get(BASE_URL + API_ENDPOINT.PRODUCT);
  return res.data;
};

export const getOneProduct = async (id) => {
  const res = await Axios.get(BASE_URL + API_ENDPOINT.PRODUCT + `/${id}`);
  return res.data;
};
