// src/components/PizzaSpinner.tsx
import React, { useEffect, useRef } from "react";
import { View, Animated, Image, StyleSheet, Easing } from "react-native";
import { useSelector } from "react-redux";

export default function PizzaSpinner() {
  const isLoading = useSelector((state: any) => state.spinner.isLoading);

  // Rotation
  const rotateAnim = useRef(new Animated.Value(0)).current;
  // Bounce (scale)
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isLoading) {
      // Rotate animation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Bounce animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      rotateAnim.stopAnimation();
      scaleAnim.stopAnimation();
    }
  }, [isLoading]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!isLoading) return null;

  return (
    <View style={styles.overlay}>
      <Animated.Image
        source={require("../../assets/loader.png")}
        style={[
          styles.pizza,
          {
            transform: [
              { rotate: rotateInterpolate },
              { scale: scaleAnim },
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  pizza: {
    width: 80,
    height: 80,
  },
});
