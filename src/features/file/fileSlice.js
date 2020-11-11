import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    files: [],
    currentFile: null,
    fileInSession: [],      // Flush when go to other pages
    status: "idle",
    error: null,
};

export const fetchFileMetas = createAsyncThunk("files/list", async () => {
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
        [fetchFileMetas.pending]: (state, action) => {
            state.status = "loading";
            state.files = [];
        },
        [fetchFileMetas.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.files = action.payload;
        },
        [uploadOneFile.pending]: (state, action) => {
            state.status = "pending";
            state.currentFile = null;
        },
        [uploadOneFile.fulfilled]: (state, action) => {
            state.status = "idle";
            state.currentFile = action.payload;
            state.fileInSession = state.fileInSession.concat(action.payload);
        },
        [removeOneFile.pending]: (state, action) => {
            state.status = "pending";
            state.currentFile = null;
        },
        [removeOneFile.fulfilled]: (state, action) => {
            state.status = "idle";
            state.files = [];

            state.fileInSession = state.fileInSession.filter(
                (file) => file._id !== action.payload._id
            );
        },
    },
});

export default fileSlice.reducer;

export const selectAllFiles = (state) => state.files.files;
