import { GET_BOOKING_SERVICES_BY_USERID } from './booking.api.js';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BOOKING_SLICE_NAME = 'booking';

// global state
const INITIAL_STATE = {
  listOfBookings: [],
};

export const getBookingByUserId = createAsyncThunk(
  `${BOOKING_SLICE_NAME}/getAllBookingByUserId`,
  // can pass in search term next time
  // { getState, dispatch } is destructure of Thunkapi, can get from other state as well
  async (_, { getState }) => {
    const { userID } = getState().login;

    try {
      const response = await axios.get(
        GET_BOOKING_SERVICES_BY_USERID('leinandar@gmail.com')
      );
      if (response.data) {
        console.log('what is the response? ' + response.data);
        return response.data;
      }
      return response.data;
    } catch (error) {
      // TODO: check error message from backend, or use own temporary error msg
    }
  }
);

export const bookingSlice = createSlice({
  name: BOOKING_SLICE_NAME,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookingByUserId.fulfilled, (state, action) => {
      console.log('response ' + action.payload);
      state.listOfBookings = action.payload;
    });
  },
});

export default bookingSlice.reducer;
