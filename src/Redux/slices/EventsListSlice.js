import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { singleEvents } from "../../api/services";

export const fetchSingleEvent = createAsyncThunk(
  "event_list/fetchSingleEvent",
  async (adminId, thunkAPI) => {
    try {
      const response = await singleEvents(adminId);
      return response.data; // Return the response data to be handled by the extraReducers
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const EventsListSlice = createSlice({
  name: "event_list",
  initialState: {
    event: {},
    loading: false,
    error: null,
  },
  reducers: {
    // Your regular reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default EventsListSlice.reducer;
