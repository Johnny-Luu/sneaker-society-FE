import Axios from 'axios';

const API_URL = 'http://localhost:3001/comment';

export const getAll = async (productID) => {
     const res = await Axios.get(API_URL + '/getall', {
          params: {
               productID: productID
          }
     });
     return res.data;
};

export const getOneByCustomer = async (productID, customerID) => {
     const res = await Axios.get(API_URL + '/getone', {
          params: {
               productID: productID,
               customerID: customerID
          }
     });
     return res.data;
};

export const createComment = async(customerID, customerName, productID, comment, rating, time) => {
     await Axios.post(API_URL + '/create', {
          customerID: customerID,
          customerName: customerName,
          productID: productID,
          comment: comment,
          rating: rating,
          time: time
     }).then(res => {
          console.log(res.data)
     })
};

export const updateComment = async (customerID, productID, comment, rating, time) => {
     await Axios.put(API_URL + '/update', {
          customerID: customerID,
          productID: productID,
          comment: comment,
          rating: rating,
          time: time
     }).then(res => {
          console.log(res.data)
     })
}

export const deleteComment = async (customerID, productID) => {
     await Axios.delete(API_URL + '/delete', {
          data: {
               customerID: customerID,
               productID: productID
          }
     }).then(res => {
          console.log(res.data)
     })
}