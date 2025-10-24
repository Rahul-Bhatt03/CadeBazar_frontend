import  Drawer  from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerType: 'slide',
      }}
    >
      <Drawer.Screen name="Staff" options={{ title: 'Staff' }} />
      {/* <Drawer.Screen name="about" options={{ title: 'About' }} /> */}
    </Drawer>
  );
}
