// app/(screens)/adminDashboard.tsx
import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { RoleBasedSidebar } from "../../../src/components/AdminSidebar";
import { SidebarOptions } from "../../../src/utils/userRole";

export default function AdminDashboard() {
  const router = useRouter();
  const [selectedRoute, setSelectedRoute] = useState("Dashboard");

  const handleSelectOption = (routeKey: string) => {
    setSelectedRoute(routeKey);
    
    // Direct lookup - routeKey should match SidebarOptions keys
  const option = SidebarOptions[routeKey];
  
  if (option) {
    console.log('Navigating to:', routeKey, option.route);
    router.push(`/(admin)/${option.route}` as any);
  } else {
    console.error('Route not found for key:', routeKey);
  }
};

  return (
    <View className="flex-1 flex-row bg-gray-100">
      {/* Sidebar - 15% width */}
      <RoleBasedSidebar
        onSelectOption={handleSelectOption}
        selectedRoute={selectedRoute}
      />

      {/* Content Area - 85% width */}
      <View className="flex-1">
        {/* The content will be rendered by the routed component */}
      </View>
    </View>
  );
}