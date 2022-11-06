import Axios from "axios";
import { API_ENDPOINT, BASE_URL } from "../constants/api-endpoint";

export const getCustomerLogin = async (email, password) => {
  const res = await Axios.get(BASE_URL + API_ENDPOINT.CUSTOMER.LOGIN, {
    params: {
      email: email,
      password: password,
    },
  });
  return res.data;
};

export const getCustomerByEmail = async (email) => {
  const res = await Axios.get(BASE_URL + API_ENDPOINT.CUSTOMER.GET_BY_EMAIL, {
    params: {
      email: email,
    },
  });
  return res.data;
};

export const createCustomerAccount = async (email, password) => {
  await Axios.post(BASE_URL + API_ENDPOINT.CUSTOMER.SIGNUP, {
    email: email,
    password: password,
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateCustomerAccount = async (
  customerID,
  newGender,
  newAddress,
  newName,
  newPhone
) => {
  await Axios.put(BASE_URL + API_ENDPOINT.CUSTOMER.UPDATE, {
    name: newName,
    phone: newPhone,
    address: newAddress,
    gender: newGender,
    id: customerID,
  });
};
