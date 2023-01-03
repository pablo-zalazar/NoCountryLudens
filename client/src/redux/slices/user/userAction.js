import { createAsyncThunk } from "@reduxjs/toolkit";
import useServices from "../../../services/useServices";

const { auth } = useServices();
const { users } = useServices();
const { friends } = useServices();

export const inviteFriend = createAsyncThunk(
  "userSlice/inviteFriend",
  async (friendId, { rejectWithValue }) => {
    try {
      await friends.inviteFriend(friendId);
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteFriend = createAsyncThunk(
  "userSlice/deleteFriend",
  async (friendId, { rejectWithValue }) => {
    try {
      const { data } = await friends.deleteFriend(friendId);
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// GET USER LOGGED
export const getUserLogged = createAsyncThunk(
  "userSlice.getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await users.privateData(id);
      const userData = {
        id: response.data._id,
        username: response.data.username,
        email: response.data.email,
        avatar: response.data.avatar,
        admin: response.data.admin,
        favorites: response.data.favorites,
        friends: response.data.friends,
        friendRequests: response.data.friendRequests
      };
      return userData;
    } catch (error) {
      console.log("error: ", error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Modify User Logged Data
export const modifyUserInfo = createAsyncThunk(
  "userSlice.modifyUserInfo",
  async ({ userId, userObject }, { rejectWithValue }) => {
    try {
      const response = await users.modify(userId, userObject);
      return response.data.user;
    } catch (error) {
      console.log("error: ", error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "userSlice.deleteUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await users.remove(id);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// TODO: CHANGE PASSWORD
export const ChangePasswordUser = createAsyncThunk(
  "userSlice.ChangePasswordUser",
  async ({ id, newPassword }, { rejectWithValue }) => {
    try {
      const response = await auth.changePassword({ id, password: newPassword });
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
