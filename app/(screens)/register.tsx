import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [passToggle,setPassToggle]=useState(false);
  const router=useRouter();

   return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account 🛵</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />

  <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passToggle}
            style={styles.inputField}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            onPress={() => setPassToggle(!passToggle)}
            style={styles.iconContainer}
          >
            <Ionicons name={passToggle ? "eye-off" : "eye"} size={22} color="#555" />
          </TouchableOpacity>
        </View>
       

        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => console.log("Registering:", name, email, password)}
        >
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(screens)/login")}>
          <Text style={styles.linkText}>
            Already have an account? <Text style={styles.highlight}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
    inputContainer: {
    position: "relative",
    justifyContent: "center",
  },
   inputField: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
    paddingRight: 40, 
  },
  iconContainer: {
    position: "absolute",
    right: 15,
    padding: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#222",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 35,
    marginTop: 5,
  },
  form: {
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  signupBtn: {
    backgroundColor:"#f50808ff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  signupText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  linkText: {
    textAlign: "center",
    color: "#666",
    marginTop: 15,
    fontSize: 15,
  },
  highlight: {
    color: "#4A90E2",
    fontWeight: "600",
  },
});
