import Axios from "axios";
import { API_ENDPOINT, BASE_URL } from "../constants/api-endpoint";

export const getAll = async (productID) => {
  const res = await Axios.get(BASE_URL + API_ENDPOINT.COMMENT.GET_ALL, {
    params: {
      productID: productID,
    },
  });
  return res.data;
};

export const getOneByCustomer = async (productID, customerID) => {
  const res = await Axios.get(BASE_URL + API_ENDPOINT.COMMENT.GET_ONE, {
    params: {
      productID: productID,
      customerID: customerID,
    },
  });
  return res.data;
};

export const createComment = async (
  customerID,
  customerName,
  productID,
  comment,
  rating,
  time
) => {
  await Axios.post(BASE_URL + API_ENDPOINT.COMMENT.CREATE, {
    customerID: customerID,
    customerName: customerName,
    productID: productID,
    comment: comment,
    rating: rating,
    time: time,
  }).then((res) => {
    console.log(res.data);
  });
};

export const updateComment = async (
  customerID,
  productID,
  comment,
  rating,
  time
) => {
  await Axios.put(BASE_URL + API_ENDPOINT.COMMENT.UPDATE, {
    customerID: customerID,
    productID: productID,
    comment: comment,
    rating: rating,
    time: time,
  }).then((res) => {
    console.log(res.data);
  });
};

export const deleteComment = async (customerID, productID) => {
  await Axios.delete(BASE_URL + API_ENDPOINT.COMMENT.DELETE, {
    data: {
      customerID: customerID,
      productID: productID,
    },
  }).then((res) => {
    console.log(res.data);
  });
};
