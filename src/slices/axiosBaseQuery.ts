import {BaseQueryFn} from "@reduxjs/toolkit/query";
import { AxiosError,AxiosRequestConfig } from "axios";
import { api } from "./Interceptor";

export const axiosBaseQuery=():BaseQueryFn<{
    url: string; method: AxiosRequestConfig["method"]; data?: any; params?: any },
    unknown,
    unknown
  > =>
    async({url,method,data,params})=>{
           try {
      const result = await api({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };