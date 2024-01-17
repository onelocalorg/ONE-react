import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUserData } from "../slices/UserSlice";

export const logOutPanel = createAsyncThunk(
  "logOutPanel",
  (_request, { dispatch }) => {
    localStorage.clear();
    dispatch(setUserData(null));
  }
);
