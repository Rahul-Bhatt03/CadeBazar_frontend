import { Stack } from "expo-router";
import "react-native-reanimated";
import {Provider, useSelector} from "react-redux";
import {store} from "../src/store/store"
import PizzaSpinner from "@/src/components/Spinner";
import { View } from "react-native";
import "../global.css"
import { AuthProvider } from "@/src/utils/AuthContext";

// wrapper to access redux state 
function GlobalLoaderWrapper(){
  const isLoading=useSelector((state:any)=>state.spinner.isLoading);
  return <>{isLoading&&<PizzaSpinner/>}</>;
}


export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <Provider store={store}>
       <AuthProvider> 
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen
            name="(screens)/login"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="(screens)/CustomerPage/customerDashboard"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="(screens)/adminDashboard/Dashboard"
            options={{ headerShown: false }}
          />

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(drawers)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>

        <GlobalLoaderWrapper />
      </View>
       </AuthProvider> 
    </Provider>
  );
}
