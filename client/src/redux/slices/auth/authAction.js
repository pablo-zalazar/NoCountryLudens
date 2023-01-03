import { createAsyncThunk } from "@reduxjs/toolkit";
import useServices from "../../../services/useServices";

const { auth } = useServices();

// REGISTER USER
export const registerUser = createAsyncThunk(
  "authSlice/registerUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      await auth.signup({ email, password, username });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// LOGIN USER
export const userLogin = createAsyncThunk(
  "authSlice/userLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await auth.login({ email, password });
      const result = {
        user: {
          id: data.user.id,
          role: data.user.admin ? "admin" : "user"
        },
        token: data.auth
      };
      return result;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
