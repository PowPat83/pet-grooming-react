import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { LOGIN, REGISTER } from './login.api.js';

// slice - has a state for specific resource, and action we want to create with the reducers
// creater asyncthunk is to make request to backend
// extra reducers to manipulate the state through create asyncthunk
// extra reducers has different cases to manipulate states in certain ways

// TODO
// set local storage so that the state will remain so we can put it our intial state if user even upon reload

const LOGIN_SLICE_NAME = 'login';

// global state
const INITIAL_STATE = {
  userID: null,
  role: '',
  // isError: false,
  isSuccess: false,
  // isLoading: false,
  // message: '',
};

/*
  TODO: 
  - loading spinner in shared-components
    -> do along with payment
*/

// function to do with the server
export const login = createAsyncThunk(
  `${LOGIN_SLICE_NAME}/login`,
  async (userForm, { dispatch }) => {
    try {
      const response = await axios.post(LOGIN, userForm);
      if (response.data) {
        const decoded = jwt_decode(response.data);
        console.log('decoded ' + JSON.stringify(decoded));
        localStorage.setItem('user', JSON.stringify(decoded));
        return decoded;
      }
      return response.data;
    } catch (error) {
      // TODO: check error message from backend, or use own temporary error msg
      //   dispatch(
      //     showMessage({
      //       message: error,
      //       variant: 'error',
      //     })
      //   );
    }
  }
);

export const register = createAsyncThunk(
  `${LOGIN_SLICE_NAME}/register`,
  // async function
  async (userForm, { rejectWithValue }) => {
    try {
      const response = await axios.post(REGISTER, userForm);
      return response.data;
    } catch (error) {
      const message = 'failed';
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  `${LOGIN_SLICE_NAME}/logout`,
  // async function
  async () => {
    localStorage.removeItem('user');
  }
);

export const loginSlice = createSlice({
  // useSelector will get the state name from here
  name: LOGIN_SLICE_NAME,
  initialState: INITIAL_STATE,
  // set the state without async thunk can put here
  reducers: {
    authenticate: (state, action) => {
      state.userID = action.payload.userID;
    },
    reset: (state) => {
      //   state.message = '';
      state.isSuccess = false;
    },
  },
  // it takes in bulder as the params
  // builder allows us to add cases
  // when login success, how we want to change the state
  // state is manipulated here as a result of asyncthunk
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      // payload from that action
      state.userID = action.payload.userID;
      state.isSuccess = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.userID = action.payload.userID;
      state.isSuccess = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.userID = '';
      state.role = '';
    });
  },
});

export const { authenticate, reset } = loginSlice.actions;

export default loginSlice.reducer;
