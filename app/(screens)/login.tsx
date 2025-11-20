import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/src/slices/userSlice";
import { AppDispatch, RootState } from "@/src/store/store";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passToggle,setPassToggle]=useState(false);
  const router = useRouter();

  const userAppSelector:TypedUseSelectorHook<RootState>=useSelector;
  const useAppDispatch=()=>useDispatch<AppDispatch>();

  const dispatch=useAppDispatch();
const { userData, isLoading, error } = userAppSelector((state) => state.auth);

  const handleLogin=()=>
{
    dispatch(loginUser({ email, password }));
}

useEffect(()=>{
if(userData&&userData.user.role){
  const role=userData.user.role.toLowerCase();
  console.log("userRole",role);
switch (role) {
  case "admin":
  case "superadmin":
  case "groupadmin":
    router.replace("/adminDashboard/Dashboard");
    break;

  case "customer":
    router.replace("/");
    break;

  default:
    router.replace("/login");
    break;
}
  }
}, [userData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 🍔</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <View style={styles.form}>
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
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passToggle}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={()=>setPassToggle(!passToggle)} style={styles.iconContainer}
          >
            <Ionicons name={passToggle ? "eye-off" : "eye"} size={22} color="#555" />
        </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(screens)/register")}>
          <Text style={styles.linkText}>
            Don’t have an account? <Text style={styles.highlight}>Sign Up</Text>
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
  loginBtn: {
    backgroundColor: "#f50808ff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
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
