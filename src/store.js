import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './login/loginSlice';
import catalogReducer from './catalog/catalogSlice';
import bookingReducer from './booking/bookingSlice';

// any reducer has to bring in to here
const store = configureStore({
  reducer: {
    login: loginReducer,
    catalog: catalogReducer,
    booking: bookingReducer,
  },
});

export default store;
