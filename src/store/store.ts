import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./localStorage";
import productsReducer from "./productSlice";
import categoriesReducer from "./categoriesSlice";
import feedbackReducer from "./feedbackSlice";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    feedback: feedbackReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const currentState = store.getState();
  saveState({
    products: currentState.products,
    categories: currentState.categories,
    feedback: currentState.feedback,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
