import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "react-native-gesture-handler";

interface loadingState{
    isLoading:boolean
}

const initialState:loadingState={isLoading:false}

const LoadingSlice=createSlice({
    name:"spinner",
    initialState,
    reducers:{
        setLoading:(state,action:PayloadAction<boolean>)=>{
            state.isLoading=action.payload;
        }
    }
})

export const {setLoading}=LoadingSlice.actions;
export default LoadingSlice.reducer;