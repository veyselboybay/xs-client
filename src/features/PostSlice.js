import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = import.meta.env.VITE_APP_BASE_URL;

const initialState = {
    isLoading: false,
    posts: [],
    success: null,
    msg: null
}

export const getPosts = createAsyncThunk('posts', async (token, thunkApi) => {
    try {
        const res = await axios.get(base_url + '/posts', { headers: { Authorization: token } });
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
})

export const newPost = createAsyncThunk('newPost', async ({content,token}, thunkApi) => {
    try {
        const res = await axios.post(base_url + '/posts', { content }, { headers: { Authorization: token } });
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
})

const PostSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.success = action.payload.success;
            state.msg = action.payload.msg;
            state.posts = action.payload.posts;
            
        }).addCase(getPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.success = action.payload.success;
            state.msg = action.payload.msg;
        }).addCase(newPost.pending, (state, action) => {
            // state.isLoading = true;
        }).addCase(newPost.fulfilled, (state, action) => {
            // state.isLoading = false;
            state.success = action.payload.success;
            state.msg = action.payload.msg;
            state.posts.unshift(action.payload.post)
        }).addCase(newPost.rejected, (state, action) => {
            state.isLoading = false;
            state.success = action.payload.success;
            state.msg = action.payload.msg;
        })
    }
})



export default PostSlice.reducer;