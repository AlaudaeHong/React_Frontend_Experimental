import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    files: [],
    currentFile: null,
    status: "idle",
    error: null,
};

export const fetchFileMatas = createAsyncThunk("files/list", async () => {
    const requrl = "/api/public/";
    const response = await fetch(requrl);

    const data = await response.json();

    return data;
});

export const uploadOneFile = createAsyncThunk(
    "files/uploadfile",
    async ({ formdata }) => {
        const requrl = "/api/public/upload";
        const response = await fetch(requrl, {
            method: "POST",
            body: formdata,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const data = await response.json();
        return data;
    }
);

export const removeOneFile = createAsyncThunk(
    "files/removefile",
    async ({ fid }) => {
        const requrl = "/api/public/" + fid;
        const response = await fetch(requrl, {
            method: "DELETE",
        });

        const data = await response.json();
        return data;
    }
);

const fileSlice = createSlice({
    name: "files",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchFileMatas.pending]: (state, action) => {
            state.status = "loading";
            state.files = [];
        },
        [fetchFileMatas.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.files = state.files.concat(action.payload);
        },
        [uploadOneFile.pending]: (state, action) => {
            state.status = "pending";
            state.currentFile = null;
        },
        [uploadOneFile.fulfilled]: (state, action) => {
            state.status = "idle";
            state.currentFile = action.payload;
        },
        [removeOneFile.pending]: (state, action) => {
            state.status = "pending";
            state.currentFile = null;
        },
        [removeOneFile.fulfilled]: (state, action) => {
            state.status = "idle";
            state.files = [];
        },
    },
});

export default fileSlice.reducer;

export const selectAllFiles = (state) => state.files.files;
