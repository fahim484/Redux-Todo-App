import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./TodoSlice";

const Store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default Store;
