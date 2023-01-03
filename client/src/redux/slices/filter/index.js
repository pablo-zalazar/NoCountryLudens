import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: ""
};

const fiterSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearFilter: state => {
      state.filter = "";
    }
  }
});

export const { changeFilter, clearFilter } = fiterSlice.actions;
export default fiterSlice.reducer;
