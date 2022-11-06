import Axios from "axios";
import { API_ENDPOINT, BASE_URL } from "../constants/api-endpoint";

export const getCurrent = async (customerID) => {
  const res = await Axios.get(BASE_URL + API_ENDPOINT.CART.GET_CURRENT, {
    params: {
      customerID: customerID,
    },
  });
  return res.data;
};

export const createCart = async (customerID) => {
  await Axios.post(BASE_URL + API_ENDPOINT.CART.CREATE_CART, {
    customerID: customerID,
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addToCart = async (
  customerID,
  id,
  name,
  brand,
  price,
  size,
  color,
  salePercent,
  image
) => {
  await Axios.post(BASE_URL + API_ENDPOINT.CART.ADD_TO_CART, {
    customerID: customerID,
    id: id,
    name: name,
    brand: brand,
    price: price,
    size: size,
    color: color,
    salePercent: salePercent,
    quantity: 1,
    image: image,
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeCartItem = async (customerID, productID) => {
  await Axios.post(BASE_URL + API_ENDPOINT.CART.REMOVE_ITEM, {
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

export const checkout = async (customerID, total) => {
  await Axios.post(BASE_URL + API_ENDPOINT.CART.CHECKOUT, {
    customerID: customerID,
    total: total,
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateQuantity = async (customerID, productID, quantity) => {
  await Axios.post(BASE_URL + API_ENDPOINT.CART.UPDATE_QUANTITY, {
    customerID: customerID,
    productID: productID,
    quantity: quantity,
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getHistory = async (GET_URL) => {
  const res = await Axios.get(GET_URL);
  return res.data;
};
