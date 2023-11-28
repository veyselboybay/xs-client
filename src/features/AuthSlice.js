import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = import.meta.env.VITE_APP_BASE_URL;

// Login 
export const login = createAsyncThunk('auth/login', async (loginData, thunkApi) => {
    try {
        const res = await axios.post(base_url + '/auth/login', loginData);
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
})

// Register
export const register = createAsyncThunk('auth/register', async (credentials, thunkApi) => {
    try {
        const res = await axios.post(base_url + '/auth/register', credentials);
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
})


const initialState = {
    isLoading: false,
    userId: null,
    username: null,
    avatarNumber: null,
    isLoggedIn: false,
    accessToken: null,
    success: null,
    msg: null,
    registerSuccess: null,
    registerMsg: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userId')
            localStorage.removeItem('username')
            state.userId = null;
            state.username = null;
            state.accessToken = null;
            state.success = null;
            state.msg = null;
            state.isLoggedIn = false;
            // state = {...initialState}
        },
        setCredentials: (state, action) => {
            const { accessToken, userId, username, avatarNumber } = action.payload;
            state.userId = userId;
            state.username = username;
            state.accessToken = accessToken;
            state.avatarNumber = avatarNumber;
            state.isLoggedIn = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.userId = action.payload.id;
            state.username = action.payload.username;
            state.accessToken = action.payload.token;
            state.success = action.payload.success;
            state.msg = action.payload.msg;
            state.avatarNumber = action.payload.avatarNumber;
            localStorage.setItem('accessToken', action.payload.token);
            localStorage.setItem('userId', action.payload.id);
            localStorage.setItem('username', action.payload.username);
            localStorage.setItem('avatarNumber', action.payload.avatarNumber);
        }).addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.success = false;
            state.msg = action.payload.msg;
        }).addCase(register.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.registerSuccess = action.payload.success;
            state.registerMsg = action.payload.msg;
        }).addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.registerSuccess = false;
            state.registerMsg = action.payload.msg;
        })
    }
})

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;