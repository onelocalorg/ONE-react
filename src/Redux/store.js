import { configureStore } from "@reduxjs/toolkit";
import eventsListReducer from "./EventsListSlice";

export const store = configureStore({
  reducer: {
    eventList: eventsListReducer,
  },
});
