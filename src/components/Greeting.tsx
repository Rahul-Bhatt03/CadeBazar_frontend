import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Greeting({name}) {
  const [greeting, setGreeting] = useState("");

  const updateGreeting =()=> {
    const currentHour = new Date().getHours(); // 0-23

    if (currentHour >= 0 && currentHour < 9) {
      setGreeting("Good Morning ☕");
    } else if (currentHour >= 9 && currentHour < 15) {
      setGreeting("Good Afternoon 🌤️");
    } else if (currentHour >= 15 && currentHour < 24) {
      setGreeting("Good Evening 🌙");
    }
  };

  useEffect(() => {
    updateGreeting();
    const interval = setInterval(updateGreeting, 60 * 1000);
    return () => clearInterval(interval);
  }, []); 

  return (
    <View className="px-5 pt-5 pb-3 bg-blue-900">
      <Text className="text-white text-2xl font-bold">{greeting},{name}</Text>
      <Text className="text-blue-200 text-sm">Welcome to CafeBazar</Text>
    </View>
  );
}
