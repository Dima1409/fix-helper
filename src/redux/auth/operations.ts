import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "services/AxiosConfig";

const setAuthHeader = (token: string) => {
  API.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  API.defaults.headers.common.Authorization = "";
};

interface RegisterCredentials {
  name: string;
  password: string;
  codePass: string;
}

const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, thunkAPI) => {
    try {
      const response = await API.post("/auth/register", credentials);
      setAuthHeader(response.data.data.user.userToken);
      return response.data.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface LoginCredentials {
  name: string;
  password: string;
}
const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const response = await API.post("/auth/login", credentials);
      setAuthHeader(response.data.data.user.userToken);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await API.get("/auth/logout");
    clearAuthHeader();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const refreshUser = createAsyncThunk("/auth/current", async (_, thunkAPI) => {
  const state: any = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }
  try {
    setAuthHeader(persistedToken);
    const response = await API.get("/auth/current");
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export { register, login, logout, refreshUser };
