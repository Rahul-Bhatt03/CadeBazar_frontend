import { Platform } from "react-native";

const LOCAL_IP = "192.168.1.7"; // your computer's IP
const PORT = 5187; // your HTTP port from launchSettings.json

const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      return `http://${LOCAL_IP}:${PORT}/api`;
    } else {
      return `http://localhost:${PORT}/api`;
    }
  } else {
    return "http://192.168.1.2:5187/api";
  }
};

export const BASE_URL = getBaseUrl();
