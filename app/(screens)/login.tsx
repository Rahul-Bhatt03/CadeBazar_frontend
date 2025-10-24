import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function LoginScreen() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const router=useRouter();

 return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        title="Login"
        onPress={() => {
          // handle login logic here
          console.log("Logging in with:", email, password);
        }}
      />

      <Button
        title="Sign Up"
        onPress={() => {
          // Navigate to the Sign Up screen
          router.push("/(screens)/register");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 5 },
});