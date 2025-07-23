import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/api";

// Async thunk to send OTP (for signup or forgot password)
export const sendOtp = createAsyncThunk(
  "otp/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/send-otp", { email });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

// Async thunk to verify OTP
export const verifyOtp = createAsyncThunk(
  "otp/verifyOtp",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/verify-otp", { email, code });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    status: null, // 'idle' | 'loading' | 'success' | 'error'
    message: "",
    error: "",
  },
  reducers: {
    clearOtpState: (state) => {
      state.status = null;
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.status = "success";
        state.message = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = "success";
        state.message = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const { clearOtpState } = otpSlice.actions;
export default otpSlice.reducer;
