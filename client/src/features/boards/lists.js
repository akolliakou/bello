import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "./boards";

const initialState = [];

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      return action.payload.lists.map(list => {
        const { cards, ...listWithout } = list;
        return listWithout;
      });      
    });
  },
});

export default listSlice.reducer;