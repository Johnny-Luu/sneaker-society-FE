import Axios from "axios";

export const getAllProduct = (GET_URL) => {
  return Axios.get(GET_URL).then((res) => res.data);
};
