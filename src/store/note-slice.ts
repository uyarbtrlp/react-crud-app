import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {  },
  reducers: {

  },
});

export const uiActions = noteSlice.actions;

export default noteSlice;
