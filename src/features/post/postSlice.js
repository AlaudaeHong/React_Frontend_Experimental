import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    currentpost: null,
    status: "idle",
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/list", async () => {
    const requrl = "/api/post/";
    const response = await fetch(requrl);

    const data = await response.json();
    return data;
});

export const fetchOnePost = createAsyncThunk(
    "posts/viewpost",
    async (postid) => {
        const requrl = "/api/post/" + postid;
        const response = await fetch(requrl);

        const data = await response.json();
        return data;
    }
);

export const updateOnePost = createAsyncThunk(
    "posts/updatepost",
    async ({ postId, post }) => {
        const requrl = "/api/post/" + postId;
        const response = await fetch(requrl, {
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return data;
    }
);

export const createOnePost = createAsyncThunk(
    "posts/createpost",
    async ({ post }) => {
        const requrl = "/api/post/upload";
        const response = await fetch(requrl, {
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return data;
    }
);

export const removeOnePost = createAsyncThunk(
    "posts/removepost",
    async ({ postId }) => {
        const requrl = "/api/post/remove/" + postId;

        const response = await fetch(requrl, {
            method: "DELETE",
        });

        const data = await response.json();
        return data;
    }
);

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = "loading";
            state.posts = [];
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = "succeeded";
            // Add any fetched posts to the array
            state.posts = action.payload;
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
        [updateOnePost.pending]: (state, action) => {
            state.status = "pending";
        },
        [updateOnePost.fulfilled]: (state, action) => {
            state.status = "uploaded";
        },
        [createOnePost.pending]: (state, action) => {
            state.status = "pending";
            state.currentpost = null;
        },
        [createOnePost.fulfilled]: (state, action) => {
            state.status = "uploaded";
            state.currentpost = action.payload;
        },
        [removeOnePost.pending]: (state, action) => {
            state.status = "pending";
            state.currentpost = null;
        },
        [removeOnePost.fulfilled]: (state, action) => {
            state.status = "idle";
            state.posts = [];
        },
    },
});

export default postSlice.reducer;
export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) => {
    state.posts.posts.find((post) => post.id === postId);
};
