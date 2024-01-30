import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';

const USERS_SLICE_NAME = 'users';
const USER_TASK_SLICE_NAME = 'tasks';

const initialState = {
  users: [],
  userTasks: [],
  isFetching: false,
  error: null,
};

export const createUserThunk = createAsyncThunk(`${USERS_SLICE_NAME}/create`, async (payload, { rejectWithValue }) => {
  try {
    const { data: { data } } = await API.createUser(payload);
    return data;

  } catch (error) {
    return rejectWithValue({ errors: error.response.data });
  }
});

export const getUsersThunk = createAsyncThunk(`${USERS_SLICE_NAME}/get`, async (payload, { rejectWithValue }) => {
  try {
    const { data: { data } } = await API.getUsers();
    return data;
  } catch (error) {
    return rejectWithValue({ errors: error.response.data });
  }
});

export const deleteUserThunk = createAsyncThunk(`${USERS_SLICE_NAME}/delete`, async (payload, { rejectWithValue }) => {
  try {
    await API.deleteUser(payload); // id
    return payload;
  } catch (error) {
    return rejectWithValue({
      errors: error.response.data
    });
  }
});

// get tasks
export const getUserTasksThunk = createAsyncThunk(`${USER_TASK_SLICE_NAME}/get`,  async (payload, { rejectWithValue }) => {
  try {
    const { data: { data } } = await API.getUserTask();
   // console.log(data)
    return data;
  } catch (error) {
    return rejectWithValue({ errors: error.response.data });
  }
});

const usersSlice = createSlice({
  name: USERS_SLICE_NAME,
  initialState,
  extraReducers: builder => {
    // get users
    builder.addCase(getUsersThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getUsersThunk.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.isFetching = false;
    });
    builder.addCase(getUsersThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
    // get users tasks
    builder.addCase(getUserTasksThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getUserTasksThunk.fulfilled, (state, { payload }) => {
      state.userTasks = payload;
      state.isFetching = false;
    });
    builder.addCase(getUserTasksThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
    // delete user
    builder.addCase(deleteUserThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(deleteUserThunk.fulfilled, (state, { payload }) => {
      state.users = state.users.filter(u => u.id !== payload);
      state.isFetching = false;
    });
    builder.addCase(deleteUserThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
    // create user
    builder.addCase(createUserThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(createUserThunk.fulfilled, (state, { payload }) => {
      state.users.push(payload);
      state.isFetching = false;
    });
    builder.addCase(createUserThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  }
});

const { reducer } = usersSlice;

export default reducer;
