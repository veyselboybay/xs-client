import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = import.meta.env.VITE_APP_BASE_URL;


// Get profile information

export const getProfileInfo = createAsyncThunk('profile', async (token,thunkApi) => {
    try {
        const res = await axios.get(base_url + '/auth/profile', {
            headers: {
                Authorization: token
            }
        });
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
})



const initialState = {
    isLoading: false,
    profile: null,
    success: null,
    msg: null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        logoutProfile: (state) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProfileInfo.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getProfileInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.success = action.payload.success;
            state.msg = action.payload.msg;
            state.profile = action.payload.user;
        }).addCase(getProfileInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.success = false;
            state.msg = action.payload.msg;
        })
    }
})

export const { logoutProfile } = profileSlice.actions;

export default profileSlice.reducer;