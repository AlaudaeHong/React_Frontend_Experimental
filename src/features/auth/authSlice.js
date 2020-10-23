import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import client from '../../utils/client';

const initialState = {
    user: { userId: null, username: null },
    error: null,
    status: "idle",
};

export const fetchAuthUser = createAsyncThunk("auth/check", async () => {
    const response = await fetch("/api/auth");

    const data = await response.json();

    return data;
});

export const loginAuthUser = createAsyncThunk("auth/login", async (user) => {
    console.log(JSON.stringify(user));

    const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    return data;
});

export const logoutAuthUser = createAsyncThunk("auth/logout", async () => {
    const response = await fetch("/api/auth/logout", {
        method: "DELETE",
    });
});

export const registerAuthUser = createAsyncThunk(
    "auth/register",
    async (user) => {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return data;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAuthUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchAuthUser.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.user = action.payload;
        },
        [fetchAuthUser.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export default authSlice.reducer;
