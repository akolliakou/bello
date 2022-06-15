import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const fetchBoard = createAsyncThunk("boards/fetchBoard", async () => {
  const data = await apiClient.getBoard();
  return data;
});

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export default boardSlice.reducer;