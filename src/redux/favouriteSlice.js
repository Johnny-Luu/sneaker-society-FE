import { createSlice } from '@reduxjs/toolkit';

export const favouriteSlice = createSlice({
     name: 'favouriteList',
     initialState: {
          favouriteList: null
     },
     reducers: {
          initFavouriteList: (state, action) => {
               state.favouriteList = action.payload;
          },

          addFavouriteToRedux: (state, action) => {
               state.favouriteList = [...state.favouriteList, action.payload];
          },

          removeFavouriteFromRedux: (state, action) => {
               state.favouriteList = state.favouriteList.filter(item => item !== action.payload);
          }
     }
});

export const { initFavouriteList, addFavouriteToRedux, removeFavouriteFromRedux } = favouriteSlice.actions;
export const selectFavouriteList = state => state.favouriteList.favouriteList;
export default favouriteSlice.reducer;