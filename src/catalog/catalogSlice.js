import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import catalogService from './catalogService';

const SLICE_NAME = 'catalog';
const DEFAULT_ITEMS_PER_PAGE = 10;

const INITIAL_STATE = {
  listOfServices: [],
  service: {},
  searchTerm: '',
  totalElements: 0,
  pageSize: DEFAULT_ITEMS_PER_PAGE,
  pageNumber: 0,
  availableTimeslot: [],
};

export const getAllGroomingServices = createAsyncThunk(
  `${SLICE_NAME}/getAllGroomService`,
  // can pass in search term next time
  // { getState, dispatch } is destructure of Thunkapi, can get from other state as well
  async (_, { getState }) => {
    const { pageSize, pageNumber, searchTerm } = getState().catalog;

    try {
      return await catalogService.getAllGroomingServices(
        pageSize,
        pageNumber,
        searchTerm
      );
    } catch (error) {
      // TODO: check error message from backend, or use own temporary error msg
    }
  }
);

// get single service
export const getSingleService = createAsyncThunk(
  'getService',
  async (serviceId) => {
    try {
      return await catalogService.getSingleService(serviceId);
    } catch (error) {
      console.log(error);
    }
  }
);

// get available time slot
export const getAvailableTimeslot = createAsyncThunk(
  'getAvailableTimeslot',
  async (scheduleDate, { getState }) => {
    const { service } = getState().catalog;
    try {
      console.log('pet Salon id ' + service.petSalonId);
      console.log('schedule date ' + scheduleDate);
      return await catalogService.getAvailableTimeslot(
        service.petSalonId,
        scheduleDate
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const catalogSlice = createSlice({
  name: SLICE_NAME,
  initialState: INITIAL_STATE,
  reducers: {
    updateCatalogType: (state, action) => {
      state.type = action.payload;
      state.pageSize = DEFAULT_ITEMS_PER_PAGE;
      state.pageNumber = 0;
    },
    updatePageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    updateRowsPerPage: (state, action) => {
      state.pageSize = action.payload;
    },
    updateAvailableTimeslot: (state, action) => {
      state.availableTimeslot = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroomingServices.fulfilled, (state, action) => {
        state.listOfServices = action.payload.content;
        state.totalElements = action.payload.totalElements;
        state.pageNumber = action.payload.pageable.pageNumber;
        state.pageSize = action.payload.pageable.pageSize;
      })
      .addCase(getSingleService.fulfilled, (state, action) => {
        state.service = action.payload;
      })
      .addCase(getAvailableTimeslot.fulfilled, (state, action) => {
        state.availableTimeslot = action.payload;
      });
  },
});

export const {
  updatePageNumber,
  updateRowsPerPage,
  updateCatalogType,
  updateAvailableTimeslot,
} = catalogSlice.actions;

export default catalogSlice.reducer;
