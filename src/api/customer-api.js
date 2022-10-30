import Axios from "axios";

const API_URL = "http://localhost:3001/customer";

export const getCustomerLogin = async (email, password) => {
  const res = await Axios.get(API_URL + "/login", {
    params: {
      email: email,
      password: password,
    },
  });
  return res.data;
};

export const getCustomerByEmail = async (email) => {
  const res = await Axios.get(API_URL + "/getbyemail", {
    params: {
      email: email,
    },
  });
  return res.data;
};

export const createCustomerAccount = async (email, password) => {
  await Axios.post(API_URL + "/signup", {
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
  await Axios.put(API_URL + "/update", {
    name: newName,
    phone: newPhone,
    address: newAddress,
    gender: newGender,
    id: customerID,
  });
};
