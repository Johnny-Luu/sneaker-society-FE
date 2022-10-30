import Axios from 'axios';

const API_URL = 'http://localhost:3001/favourite';

export const getFavourites = async (customerID) => {
     const res = await Axios.get(API_URL + '/getfavourite', {
          params: {
               customerID: customerID
          }
     });
     return res.data;
};

export const createFavouriteList = async (customerID) => {
     await Axios.post(API_URL + '/createfavouritelist', { customerID: customerID })
          .then(res => {
               console.log(res.data)
          }).catch(err => {
               console.log(err)
          });
};

export const addFavourite = async (customerID, productID) => {
     await Axios.post(API_URL + '/addfavourite', {
          customerID: customerID,
          productID: productID
     })
          .then(res => {
               console.log(res.data)
          }).catch(err => {
               console.log(err)
          });
};

export const removeFavourite = async (customerID, productID) => {
     await Axios.post(API_URL + '/removefavourite', {
          customerID: customerID,
          productID: productID
     })
          .then(res => {
               console.log(res.data)
          }).catch(err => {
               console.log(err)
          });
};