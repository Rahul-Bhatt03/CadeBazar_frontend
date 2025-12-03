import { Stack } from 'expo-router';
import { View } from 'react-native';
import { RoleBasedSidebar } from '../../src/components/AdminSidebar';
import { useRouter, useSegments } from 'expo-router';
import { useState, useEffect } from 'react';
import { SidebarOptions } from '../../src/utils/userRole';
import "../../global.css"

export default function AdminLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [selectedRoute, setSelectedRoute] = useState("Dashboard");

  useEffect(() => {
    const currentRoute = segments[segments.length - 1];
    if (currentRoute) {
      setSelectedRoute(currentRoute as string);
    }
  }, [segments]);

  const handleSelectOption = (routeKey: string) => {
    setSelectedRoute(routeKey);
    const option = SidebarOptions[routeKey];
    
    if (option) {
      console.log('Navigating to:', routeKey, option.route);
      router.push(`/${option.route}` as any);
    }
  };

  return (
    <View className="flex-1 flex-row bg-gray-100">
      <RoleBasedSidebar
        onSelectOption={handleSelectOption}
        selectedRoute={selectedRoute}
      />
      
      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
}