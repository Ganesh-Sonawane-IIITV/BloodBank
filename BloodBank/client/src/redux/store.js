import userSlice from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice"

const store = configureStore({
    reducer:{
        users: userSlice,
        loaders: loaderSlice,

    },
});

export default store;