import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boards/boards";
import listsReducer from "../features/boards/lists";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
  },
});

export default store;
