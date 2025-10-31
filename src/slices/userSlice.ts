import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./BaseUrl";
import { api } from "./Interceptor";


interface UserData {
  email: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

interface UserState {
  userData: UserData | null;
  isLoading: boolean;
  error: string | null;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
  [key: string]: any;
}

const initialState: UserState = {
  userData: null,
  isLoading: false,
  error: null,
};

// helper funct to get the stored userData 
export const getStoredUserData=async():Promise<UserData|null> =>{
try {
   const userData = await AsyncStorage.getItem("userData");
   console.log("userdata",userData);
   if(userData){
     console.log("userdata2",JSON.parse(userData))
   }
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.log("Error getting stored user data:", error);
    return null;
}
}

export const loginUser = createAsyncThunk<UserData, LoginPayload, { rejectValue: string }>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/user/login`, { email, password });
        console.log("📦 Storing user data:", JSON.stringify(response.data, null, 2));
      await AsyncStorage.setItem("userData", JSON.stringify(response.data));
        const storedData = await AsyncStorage.getItem("userData");
      console.log("✅ Verified stored data:", storedData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk<UserData, RegisterPayload, { rejectValue: string }>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// Initialize user data from storage
export const initializeUser = createAsyncThunk<UserData | null>(
  "auth/initialize",
  async () => {
    return await getStoredUserData();
  }
);

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
      AsyncStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
 // Initialize user
    builder.addCase(initializeUser.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    //login cases
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? "Login failed";
    });

    // register cases 
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? "Registration failed";
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
