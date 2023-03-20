import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenseSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    expense: expenseReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
