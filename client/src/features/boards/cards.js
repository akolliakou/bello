import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "./boards";

const initialState = [];

export const fetchCard = createAsyncThunk("cards/fetchCard", async (id) => {
  const data = await apiClient.getCard(id)
  return data;
})

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
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      const filteredCards = state.filter(card => {
        return card._id !== action.payload._id;
      });
      return filteredCards.concat(action.payload);
    });
  }
});

export default cardSlice.reducer;