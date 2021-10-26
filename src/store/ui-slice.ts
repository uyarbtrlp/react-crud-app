import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { alertVisible: false, type: null, message: null },
  reducers: {
    closeNotification(state) {
      state.alertVisible = false
    },
    showNotification(state, action) {
      state.alertVisible = true
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
