import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user/index.js";
import authSlice from "./slices/auth/index";
import filterSlice from "./slices/filter/index";
import messageReducer from "./slices/messages/messagesSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    filter: filterSlice,
    message: messageReducer
  }
});

export default store;
