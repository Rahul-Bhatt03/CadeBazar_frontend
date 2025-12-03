import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const mainApi=createApi({
    reducerPath:"mainApi",
    baseQuery:axiosBaseQuery(),
    tagTypes: ["Categories", "SubCategory","Cuisine","FoodItem"]as const,

    endpoints:()=>({}),
});