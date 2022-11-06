export const BASE_URL = "http://localhost:3001";

export const API_ENDPOINT = {
  CART: {
    GET_CURRENT: "/cart/getcurrent",
    CREATE_CART: "/cart/createcart",
    ADD_TO_CART: "/cart/addtocart",
    REMOVE_ITEM: "/cart/removeone",
    CHECKOUT: "/cart/checkout",
    UPDATE_QUANTITY: "/cart/updatequantity",
  },
  COMMENT: {
    GET_ALL: "/comment/getall",
    GET_ONE: "/comment/getone",
    CREATE: "/comment/create",
    UPDATE: "/comment/update",
    DELETE: "/comment/delete",
  },
  CUSTOMER: {
    LOGIN: "/customer/login",
    GET_BY_EMAIL: "/customer/getbyemail",
    SIGNUP: "/customer/signup",
    UPDATE: "/customer/update",
  },
  FAVOURITE: {
    GET: "/favourite/getfavourite",
    CREATE_LIST: "/favourite/createfavouritelist",
    ADD: "/favourite/addfavourite",
    REMOVE: "/favourite/removefavourite",
  },
  PRODUCT: "/product",
};
