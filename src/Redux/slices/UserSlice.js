import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../../utils/UserInfo";

const UserSlice = createSlice({
  name: "user_detail",
  initialState: {
    userData: getUserInfo(),
  },
  reducers: {
    setUserData: (state, action) => ({
      ...state,
      userData: action.payload,
    }),
  },
});

// Export the actions and the reducer
export const { setUserData } = UserSlice.actions;
export default UserSlice.reducer;
