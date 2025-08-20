import { combineSlices, configureStore } from "@reduxjs/toolkit";

import {thunk }from "redux-thunk"; 
import productsReducer from "./slices/productsSlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice"

const reducer = combineSlices({
    productsState: productsReducer,
    productState : productReducer,
    authState : authReducer
   
});


const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), 
    // middleware : [thunk],
});

export default store;

