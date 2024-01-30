import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';


const USER_TASK_SLICE_NAME = 'users';

const initialState = {
    usersTask: [],
    isFetching: false,
    error: null,
};


// get tasks
export const getUserTasksThunk = createAsyncThunk(`${USER_TASK_SLICE_NAME}/getTasks`, async (payload, { rejectWithValue }) => {
    console.log(payload)
    try {
        const { data: { data } } = await API.getUserTask(payload); // id
        console.log(data);
        return data;

    } catch (error) {
        return rejectWithValue({ errors: error.response.data });
    }
});  


const usersTaskSlice = createSlice({
    name: USER_TASK_SLICE_NAME,
    initialState,
    extraReducers: builder => {
        // get users tasks
        builder.addCase(getUserTasksThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
          });
          builder.addCase(getUserTasksThunk.fulfilled, (state, { payload }) => {
            state.users = payload;
            state.isFetching = false;
          });
          builder.addCase(getUserTasksThunk.rejected, (state, { payload }) => {
            state.error = payload;
            state.isFetching = false;
          });
    }

});


const { reducer } = usersTaskSlice;

export default reducer;
