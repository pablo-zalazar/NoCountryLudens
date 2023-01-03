import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authAction";
import { getUserLogged, getToken, addLocal, removeLocal } from "../../../services/localStorage";

const initialState = {
  loadingAuth: false,
  userLogged: getUserLogged(),
  userToken: getToken(),
  errorAuth: null,
  successAuth: false
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: state => {
      state.userLogged = false;
      state.userToken = false;
      state.successAuth = false;
      state.errorAuth = false;
      removeLocal();
    }
  },
  extraReducers: {
    // register user with email and password
    [registerUser.pending]: state => {
      state.loadingAuth = true;
      state.successAuth = false;
      state.errorAuth = null;
    },
    [registerUser.fulfilled]: state => {
      state.loadingAuth = false;
      state.errorAuth = null;
      state.successAuth = true; // register successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.successAuth = false;
      state.errorAuth = payload;
    },

    // login user with email and password
    [userLogin.pending]: state => {
      state.loadingAuth = true;
      state.successAuth = false;
      state.errorAuth = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loadingAuth = false;
      state.successAuth = true; // login succefull
      state.userLogged = payload.user;
      state.userToken = payload.token;
      state.errorAuth = false;
      addLocal({ user: state.userLogged, auth: state.userToken });
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loadingAuth = false;
      state.errorAuth = payload;
      state.successAuth = false;
    }
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
