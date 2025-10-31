import { Stack } from "expo-router";
import "react-native-reanimated";
import {Provider, useSelector} from "react-redux";
import {store} from "../src/store/store"
import PizzaSpinner from "@/src/components/Spinner";
import { View } from "react-native";

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
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen
            name="(screens)/login"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screens)/superAdminDashboard"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screens)/groupAdminDashboard"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screens)/customerDashboard"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screens)/deliveryDashboard"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screens)/adminDashboard"
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
    </Provider>
  );
}
