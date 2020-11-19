import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    status: "idle",
    setting: null,
};

export const fetchCustomSetting = createAsyncThunk("custom/get", async () => {
    const response = await fetch("/api/custom");
    const data = await response.json();
    return data;
});

export const updateCustomSetting = createAsyncThunk(
    "custom/update",
    async (customSetting) => {
        const response = await fetch("/api/custom", {
            method: "POST",
            body: JSON.stringify(customSetting),
            headers: {
                "content-type": "application/json",
            },
        });

        const data = await response.json();
        return data;
    }
);

export const customSettingSlice = createSlice({
    name: "custom",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCustomSetting.pending]: (state, action) => {
            state.status = "pending";
        },
        [fetchCustomSetting.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.setting = action.payload;
        },
        [updateCustomSetting.pending]: (state, action) => {
            state.status = "pending";
        },
        [updateCustomSetting.fulfilled]: (state, action) => {
            state.status = "idle";
            state.setting = action.payload;
        },
    },
});

export default customSettingSlice.reducer;
