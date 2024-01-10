// EventsListSlice.js

import { createSlice } from "@reduxjs/toolkit";

const EventsListSlice = createSlice({
  name: "event_list",
  initialState: {
    // Your initial state
  },
  reducers: {
    eventfetch: (state, action) => {
      // Your reducer logic here
    },
  },
});

// Export the actions and the reducer
export const { eventfetch } = EventsListSlice.actions;
export default EventsListSlice.reducer;
