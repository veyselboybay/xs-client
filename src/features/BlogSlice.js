import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const base_url = import.meta.env.VITE_APP_BASE_URL;

export const getBlogs = createAsyncThunk('blogs/get', async (token, thunkApi) => {
    try {
        const res = await axios.get(base_url + '/blogs', { headers: { Authorization: token } });
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
})

const initialState = {
    isLoading: false,
    blogs: [],
    success: null,
    msg: null
}

const BlogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getBlogs.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.success = action.payload.success;
            state.msg = action.payload.msg;
            state.blogs = action.payload.blogs;
        }).addCase(getBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.success = action.payload.success;
            state.msg = action.payload.msg;
        })
    }
})

export default BlogSlice.reducer;