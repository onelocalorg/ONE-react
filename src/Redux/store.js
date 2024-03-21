import { configureStore } from "@reduxjs/toolkit";
import eventsListReducer from "./slices/EventsListSlice";
import userReducer from "./slices/UserSlice";
import TicketCheckinsReducer from "./slices/TicketCheckinsSlice";

export const store = configureStore({
  reducer: {
    eventList: eventsListReducer,
    userInfo: userReducer,
    showTicketCheckins: TicketCheckinsReducer,
  },
});
