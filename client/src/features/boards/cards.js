import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "./boards";

const initialState = [];

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      let cards = []
      action.payload.lists.forEach(list => {
        cards = cards.concat(list.cards)
      });
      return cards;
    });
  }
});

export default cardSlice.reducer;