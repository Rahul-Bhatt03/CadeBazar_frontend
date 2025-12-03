import React, { useRef, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RoleAccess, SidebarOptions } from "../utils/userRole";
import { Animated } from "react-native";


interface RoleBasedSidebarProps {
  onSelectOption: (route: string) => void;
  selectedRoute: string;
}

export const RoleBasedSidebar: React.FC<RoleBasedSidebarProps> = ({
  onSelectOption, selectedRoute,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { getUserRole } = useAuth();
  type RoleKeys = keyof typeof RoleAccess;

  const userRole = getUserRole() as RoleKeys;
  const accessibleRoutes = RoleAccess[userRole] ||RoleAccess[userRole?.toLowerCase() as RoleKeys] || [];

  const translateX = useRef(new Animated.Value(-250)).current;

  const toggleDrawer = () => {
    Animated.timing(translateX, {
      toValue: isDrawerOpen ? -250 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsDrawerOpen(!isDrawerOpen);
  }

  // const test = Object.values(SidebarOptions);
  // test.forEach(item => {
  //   console.log(item.label, item.icon)
  // })

  const filteredOptions = Object.entries(SidebarOptions).filter(([key]) =>
    accessibleRoutes.includes(key)
  );

// console.log('Accessible Routes:', accessibleRoutes);
// console.log('Filtered Options:', filteredOptions);

  return (
    <>
    <View style={{ position: "absolute", top: 20, left: 20, zIndex: 200 }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Ionicons name="menu-outline" size={32} color="black" />
      </TouchableOpacity>
    </View>

    {isDrawerOpen && (
      <TouchableOpacity
        activeOpacity={1}
        onPress={toggleDrawer}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 90,
        }}
      />
    )}

    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 250,
        backgroundColor: "#1f2937",
        transform: [{ translateX }],
        paddingTop: 50,
        zIndex: 100,
      }}
    >
      <ScrollView>
        <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#374151" }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>CafeBazar</Text>
          <Text style={{ color: "#9ca3af", fontSize: 12 }}>{userRole}</Text>
        </View>

        <View style={{ paddingVertical: 12 }}>
          {filteredOptions.map(([key, option]) => {
            const isSelected = selectedRoute === key;
            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  onSelectOption(key); 
                  toggleDrawer();  
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  backgroundColor: isSelected ? "#2563eb" : "transparent",
                  borderRadius: 8,
                  marginHorizontal: 10,
                  marginVertical: 4,
                }}
              >
                <Ionicons
                  name={option.icon}
                  size={20}
                  color={isSelected ? "#fff" : "#9CA3AF"}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    color: isSelected ? "#fff" : "#9CA3AF",
                    fontWeight: isSelected ? "600" : "400",
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </Animated.View>
  </>
);
}