import Greeting from "@/src/components/Greeting";
import { Image } from "expo-image";
import { useState } from "react";
import { Platform, StatusBar, ScrollView, TouchableOpacity, View, Text } from "react-native";

export default function HomeScreen() {
  const [userName,setUserName]=useState("Rahul");

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View
        className={`flex-row justify-between items-center px-5 ${
          Platform.OS === "ios" ? "pt-16" : "pt-10"
        } pb-5 bg-blue-900`}
      >
       <Greeting name={userName}/>

        <TouchableOpacity className="w-11 h-11 rounded-full bg-blue-500 justify-center items-center">
          <Text className="text-lg">👤</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View className="mb-6 px-5">
        <Text className="text-gray-900 text-xl font-bold mb-4">
          Categories
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="space-x-3"
        >
          <TouchableOpacity className="bg-blue-900 rounded-xl px-5 py-4 justify-center items-center shadow-md">
            <Text className="text-2xl mb-2">☕</Text>
            <Text className="text-white font-semibold text-sm">Coffee</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-xl px-5 py-4 justify-center items-center shadow-md">
            <Text className="text-2xl mb-2">🍰</Text>
            <Text className="text-gray-700 font-semibold text-sm">Desserts</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-xl px-5 py-4 justify-center items-center shadow-md">
            <Text className="text-2xl mb-2">🥪</Text>
            <Text className="text-gray-700 font-semibold text-sm">Snacks</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-xl px-5 py-4 justify-center items-center shadow-md">
            <Text className="text-2xl mb-2">🧃</Text>
            <Text className="text-gray-700 font-semibold text-sm">Drinks</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
