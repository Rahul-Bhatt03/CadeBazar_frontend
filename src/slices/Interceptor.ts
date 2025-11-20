import axios from "axios";
import { BASE_URL } from "./BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { setLoading } from "./LoadingSlice";
// import { store } from "../store/store";

// to dispatch loading state 
let dispatchFunction:((action:any)=>void)|null=null;


export const setDispatch=(dispatch:(action:any)=>void)=>{
    dispatchFunction=dispatch;
}

const setLoading = (isLoading: boolean) => {
  if (dispatchFunction) {
    dispatchFunction({ type: 'spinner/setLoading', payload: isLoading });
  }
};

// const token=AsyncStorage.getItem('userDate.token');

export const api=axios.create({
    baseURL:`${BASE_URL}`||"http://192.168.1.7:5187/api",
    headers:{
        "Content-Type":"application/json"
    }
});

// req interceptor
api.interceptors.request.use(async(config)=>{
      console.log("⏳ Showing spinner..."); 
    // show spinner 
setLoading(true);

try {
    const data=await AsyncStorage.getItem("userData");
    if (data){
        const parsedData=JSON.parse(data);
        const token =parsedData.token;
        if(token){
            config.headers.Authorization=  `Bearer ${token}`;
        }
    }
} catch (error) {
    console.log("Error getting token",error)
}

    return config;
},
(error)=>{
     console.log(" Request error - hiding spinner");
   setLoading(false);
    return Promise.reject(error);
}
);

// res interceptor
api.interceptors.response.use(
  (response) => {
    setLoading(false);
    console.log("✅ Response received:", response.status, response.config.url);
    return response;
  },
  (error) => {
    setLoading(false);

    console.log("❌ Axios Error Occurred:");
    console.log("➡️ URL:", error.config?.url);
    console.log("➡️ Method:", error.config?.method);
    console.log("➡️ Base URL:", error.config?.baseURL);

    if (error.response) {
      // The server responded but with an error code (4xx, 5xx)
      console.log("🔸 Server responded with error:");
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
      console.log("Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response (network issue, CORS, SSL, etc.)
      console.log("🔹 Request made but no response received");
      console.log("🔹 Request details:", error.request);
      console.log(
        "❗ This usually means a network issue (wrong IP, SSL cert, or backend not reachable)"
      );
    } else {
      // Something else before making the request
      console.log("🔻 Axios setup issue:", error.message);
    }

    console.log("⚙️ Full Config:", error.config);

    return Promise.reject(error);
  }
);
