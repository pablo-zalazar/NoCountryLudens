import { createSlice } from "@reduxjs/toolkit";
import { CHAT_SETIONS } from "../../../components/MessageComponents/utils/chatSetions";

const messagesSlide = createSlice({
  name: "message",
  initialState: {
    selectUser: false,
    firstSectionOfPage: CHAT_SETIONS.searchFriends,
    secondSectionOfPage: null,
    thirdSectionOfPage: null,
    currentUser: null,
    currentMessage: "",
    currentChat: []
  },
  reducers: {
    setSelectUser: (state, action) => {
      state.selectUser = action.payload;
    },
    setFirstSectionOfPage: (state, action) => {
      state.firstSectionOfPage = action.payload;
    },
    setSecondSectionOfPage: (state, action) => {
      state.secondSectionOfPage = action.payload;
    },
    setThirdSectionOfPage: (state, action) => {
      state.thirdSectionOfPage = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setCurrentMessage: (state, action) => {
      state.currentMessage = action.payload;
    },
    resetCurrentUser: state => {
      state.currentUser = null;
      state.currentChat = [];
    },
    setChatHistory: (state, action) => {
      state.currentChat = action.payload;
    },
    editChatHistory: (state, action) => {
      state.currentChat = [...state.currentChat, action.payload];
    }
    // editChatHistory: (state, action) => {
    //   state.currentChat.messages = [...state.currentChat.messages, action.payload];
    // }
    // resetChatHistory: state => {
    //   state.currentChat = [];
    // }
  }
});

export const {
  setSelectUser,
  setCurrenMessage,
  setFirstSectionOfPage,
  setSecondSectionOfPage,
  setThirdSectionOfPage,
  setCurrentUser,
  resetCurrentUser,
  setChatHistory,
  editChatHistory,
  setChannel
  // resetChatHistory
} = messagesSlide.actions;

export default messagesSlide.reducer;
