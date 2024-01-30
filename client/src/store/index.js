import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import usersTaskReducer from './slices/usersTaskSlice';

const store = configureStore({
  reducer: {
    usersData: usersReducer,
    usersTaskData: usersTaskReducer
  },
});

export default store;
