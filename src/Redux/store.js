import { configureStore } from "@reduxjs/toolkit";
import eventsListReducer from "./slices/EventsListSlice";
import userReducer from "./slices/UserSlice";

export const store = configureStore({
  reducer: {
    eventList: eventsListReducer,
    userInfo: userReducer,
  },
});
