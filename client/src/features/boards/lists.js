import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "./boards";

const initialState = [];

export const createList = createAsyncThunk("lists/createList", async (newList) => {
  const data = await apiClient.createList(newList);
  return data;
});

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const filterLists = state.filter(list => {
        return list.boardId !== action.payload._id
      }
      );
      const listsWithoutCards =  action.payload.lists.map(list => {
        const { cards, ...listWithout } = list;
        return listWithout;
      });
      return filterLists.concat(listsWithoutCards);      
    });
    builder.addCase(createList.fulfilled, (state, action) => {
      const { cards, ...listWithout } = action.payload;
      return state.concat(listWithout)
    })
  },
});

export default listSlice.reducer;