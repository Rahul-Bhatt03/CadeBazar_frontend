import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CuisineProp = {
    name: String,
    iconName: String,
    iconColor?: String,
    iconSize?: Number
}

export default function CuisineCard({ name, iconName, iconColor = "black", iconSize = 24 }:CuisineProp) {
  return (
    <View className="bg-white p-4 rounded-lg shadow mr-2 flex-row items-center">
      <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />
      <Text className="text-lg font-semibold ml-2">{name}</Text>
    </View>
  );
}
