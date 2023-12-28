import { configureStore } from "@reduxjs/toolkit";
import EventsListSlice from "./EventsListSlice";

export const store = configureStore({
  reducer: {
    // Add your slice reducers here
    EventList: EventsListSlice,
  },
});
