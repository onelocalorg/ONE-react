import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../../utils/UserInfo";

const TicketCheckinsSlice = createSlice({
  name: "user_detail",
  initialState: {
    isCreateEventEnabled: false,
  },
  reducers: {
    setCreateEventEnabled: (state, action) => {
      state.isCreateEventEnabled = action.payload;
    },
  },
});

// Export the actions and the reducer
export const { setCreateEventEnabled } = TicketCheckinsSlice.actions;
export default TicketCheckinsSlice.reducer;
