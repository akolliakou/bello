import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const data = await apiClient.getBoards();
  return data;
});

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (newBoard, callback) => {
    const data = await apiClient.createBoard(newBoard);
    if (callback) {
      callback;
    }
    return data;
  }
);

export const fetchBoard = createAsyncThunk("boards/fetchBoard", async (id) => {
  const data = await apiClient.getBoard(id);
  console.log("Data:", data);
  
  return data;
});

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      return action.payload.reduce((acc, comm) => {
        //eslint-disable-next-line
        const { lists, ...boardWithoutLists } = comm;
        return acc.concat(boardWithoutLists);
      }, []);
    }),
      builder.addCase(createBoard.fulfilled, (state, action) => {
       return state.push(action.payload);
      });
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
        const found = state.find(b => b._id === action.payload._id);
        //eslint-disable-next-line
        const { lists, ...boardWithout } = action.payload;
        console.log("Boardwithout:", boardWithout)
        if (!found) {
          return state.concat(boardWithout);
        } else {
          return state.map(b => {
            return b._id === action.payload._id ? boardWithout : b;
          });
        }
      });
  },
});

export default boardSlice.reducer;
