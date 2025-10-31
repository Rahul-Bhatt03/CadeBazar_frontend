import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import LoadingReducer from "../slices/LoadingSlice"
import { setDispatch } from "../slices/Interceptor";

export const store=configureStore({
    reducer:{
        auth:userReducer,
        spinner:LoadingReducer
    }
})

// initialize the interceptor with store dispatch 
setDispatch(store.dispatch);

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;