import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  getUserData: () => Promise<void>;
  getUserRole: () => string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const getUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      console.log("Raw AsyncStorage data:", data);
      if (data) {
        const parsed: { user: User; token: string } = JSON.parse(data);
        console.log("Parsed user data:", parsed);
        setUser(parsed.user);
        setToken(parsed.token);
      } else {
        setUser(null);
        setToken(null);
      }
    } catch (err) {
      console.error("Error getting user data:", err);
      setUser(null);
      setToken(null);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserRole = () => {
    return user?.role || "customer";
  };

  return (
    <AuthContext.Provider value={{ user, token, getUserData, getUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
