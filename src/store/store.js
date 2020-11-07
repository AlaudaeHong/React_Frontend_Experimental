import { configureStore } from '@reduxjs/toolkit';
import authSlice from "../features/auth/authSlice";
import postSlice from "../features/post/postSlice";
import fileSlice from "../features/file/fileSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        posts: postSlice,
        files: fileSlice,
    },
})