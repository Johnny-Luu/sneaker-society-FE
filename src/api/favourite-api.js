import Axios from "axios";
import { API_ENDPOINT, BASE_URL } from "../constants/api-endpoint";

export const getFavourites = async (customerID) => {
  const res = await Axios.get(BASE_URL + API_ENDPOINT.FAVOURITE.GET, {
    params: {
      customerID: customerID,
    },
  });
  return res.data;
};

export const createFavouriteList = async (customerID) => {
  await Axios.post(BASE_URL + API_ENDPOINT.FAVOURITE.CREATE_LIST, {
    customerID: customerID,
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addFavourite = async (customerID, productID) => {
  await Axios.post(BASE_URL + API_ENDPOINT.FAVOURITE.ADD, {
    customerID: customerID,
    productID: productID,
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeFavourite = async (customerID, productID) => {
  await Axios.post(BASE_URL + API_ENDPOINT.FAVOURITE.REMOVE, {
    customerID: customerID,
    productID: productID,
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
