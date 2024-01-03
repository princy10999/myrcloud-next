import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { createClient } from "../Actions/ClientCreation";

const initialState = {
  createClientData: {},
};
export let CreateClient: any = createSlice({
  name: "rcloud",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(createClient.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(createClient.fulfilled, (state: any, { payload }: any) => {
      state.createClientData = payload.data;
      state.status = "success";
    });
    builder.addCase(createClient.rejected, (state: any, { payload }: any) => {
      state.createClientData = payload;
      state.status = "failed";
    });
  },
});

export let ClientDetailById: any = createSlice({
    name: "rcloud",
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
      builder.addCase(createClient.pending, (state: any) => {
        state.status = "loading";
      });
      builder.addCase(createClient.fulfilled, (state: any, { payload }: any) => {
        state.createClientData = payload.data;
        state.status = "success";
      });
      builder.addCase(createClient.rejected, (state: any, { payload }: any) => {
        state.createClientData = payload;
        state.status = "failed";
      });
    },
  });

export default combineReducers({
  isCreateClient: CreateClient.reducer,
});
