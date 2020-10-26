import { configureStore } from '@reduxjs/toolkit';
import authSlice from "../features/auth/authSlice";
import postSlice from "../features/post/postSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        posts: postSlice,
    },
})