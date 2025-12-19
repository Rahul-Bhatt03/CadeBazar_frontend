import { Platform } from "react-native";

const LOCAL_IP = "192.168.1.2"; 
const PORT = 5187; 

const getBaseUrl = () => {
// can toggle between local and deployed backend by just changing USE_DEPLOYED to true or false.
   const USE_DEPLOYED = false;

  if (USE_DEPLOYED) {
    return "https://cafebazar-7epc.onrender.com/api";
  }


  if (__DEV__) {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      return `http://${LOCAL_IP}:${PORT}/api`;
    } else {
      return `http://localhost:${PORT}/api`;
    }
  } else {
    return "http://192.168.1.7:5187/api";
  }
};

export const BASE_URL = getBaseUrl();
