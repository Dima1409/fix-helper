import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refreshUser } from "./operations";

const initialState = {
  user: {
    name: null,
    role: null,
  },
  token: null,
  isLoggedIn: false,
  isPending: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handleFulfilled = (state: typeof initialState, action: any) => {
      state.user.name = action.payload.user.loginUser.name;
      state.user.role = action.payload.user.loginUser.role;
      state.token = action.payload.user.userToken;
      state.isLoggedIn = true;
      state.isPending = false;
      state.isRefreshing = false;
      state.error = null;
    };

    const handlePending = (state: typeof initialState) => {
      state.isPending = true;
      state.isRefreshing = true;
    };

    const handleRejected = (state: typeof initialState, action: any) => {
      state.error = action.payload.error;
      state.isPending = false;
      state.isRefreshing = false;
    };

    builder
      .addCase(register.fulfilled, handleFulfilled)
      .addCase(login.fulfilled, handleFulfilled)
      .addCase(logout.fulfilled, (state) => {
        state.user = {
          name: null,
          role: null,
        };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.isPending = false;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state: typeof initialState, action) => {
        state.user.name = action.payload.name;
        state.user.role = action.payload.role;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isPending = false;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(register.pending, handlePending)
      .addCase(login.pending, handlePending)
      .addCase(logout.pending, handlePending)
      .addCase(refreshUser.pending, handlePending)
      .addCase(register.rejected, handleRejected)
      .addCase(login.rejected, handleRejected)
      .addCase(logout.rejected, handleRejected)
      .addCase(refreshUser.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
