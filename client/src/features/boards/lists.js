import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "./boards";

const initialState = [];

export const createList = createAsyncThunk("lists/createList", async (newList) => {
  const data = await apiClient.createList(newList);
  return data;
});

export const updateList = createAsyncThunk("lists/updateList", async (updatedList) => {
  const { id, ...withoutId } = updatedList
  const data = await apiClient.updateList(id, withoutId);
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
    });
    builder.addCase(updateList.fulfilled, (state, action) => {
      const id = action.payload._id
      return state.map(list => {
        return list._id === id ? action.payload : list;
      });
    });
  },
});

export default listSlice.reducer;