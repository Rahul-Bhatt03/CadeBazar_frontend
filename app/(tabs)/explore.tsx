import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

export default function ExploreScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-100">
      <Text className="text-lg font-bold text-blue-600">
        Hello NativeWind!
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
