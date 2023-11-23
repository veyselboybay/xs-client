import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./features/AuthSlice";
import ProfileSlice from "./features/ProfileSlice";
import PostSlice from "./features/PostSlice";
import BlogSlice from "./features/BlogSlice";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        profile: ProfileSlice,
        post: PostSlice,
        blogs: BlogSlice
    }
})