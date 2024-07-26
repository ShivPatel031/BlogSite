import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";

const store = configureStore({
    reducer:{
        auth:authSlice,
        post:postSlice
    }
});
// take one more reduser for post so that we don't have to make database call for every time we load component

export default store;