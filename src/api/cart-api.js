import Axios from "axios";

const API_URL = "http://localhost:3001/cart";

export const getCurrent = async (customerID) => {
  const res = await Axios.get(API_URL + "/getcurrent", {
    params: {
      customerID: customerID,
    },
  });
  return res.data;
};

export const createCart = async (customerID) => {
  await Axios.post(API_URL + "/createcart", { customerID: customerID })
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
  await Axios.post(API_URL + "/addtocart", {
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
  await Axios.post(API_URL + "/removeone", {
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
  await Axios.post(API_URL + "/checkout", {
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
  await Axios.post(API_URL + "/updatequantity", {
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

export const getHistory = (GET_URL) => {
  return Axios.get(GET_URL).then((res) => res.data);
};
