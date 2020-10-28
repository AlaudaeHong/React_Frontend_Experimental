import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    currentpost: null,
    status: "idle",
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/list", async () => {
    console.log("fetching");
    const requrl = "/api/post/";
    const response = await fetch(requrl);

    const data = await response.json();
    return data;
});

export const fetchOnePost = createAsyncThunk("posts/viewpost", async (postid) => {
    const requrl = "/api/post/" + postid;
    const response = await fetch(requrl);

    const data = await response.json();
    return data;
});

export const updateOnePost = createAsyncThunk("posts/updatepost", async({postId, post})=>{
    const requrl = "/api/post/" + postId;
    console.log("hello:");
    console.log(post);
    const response = await fetch(requrl, {
        method: "POST",
        body: JSON.stringify(post),
        headers:{
            "Content-Type": "application/json",
        }
    });

    return null;
});

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = "succeeded";
            // Add any fetched posts to the array
            state.posts = state.posts.concat(action.payload);
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [fetchOnePost.pending]: (state, action) => {
            state.status = "loading";
            state.currentpost = null;
        },
        [fetchOnePost.fulfilled]: (state, action) => {
            state.status = "succeeded";
            // Add any fetched posts to the array
            state.currentpost = action.payload;
        },
        [updateOnePost.pending]: (state, action) =>{
            state.status = "pending";
        },
        [updateOnePost.pending]: (state, action) =>{
            state.status = "succeed";
        },
    },
});

export default postSlice.reducer;
export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) => {
    state.posts.posts.find((post) => post.id === postId);
};
