import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { ApiResponse, fetchCategories } from "@/services/fakeStore";

// Definindo a interface do estado
interface CategoryState {
  data: string[] | [];
  loading: boolean;
  error?: string;
}

const initialState: CategoryState = {
  data: [],
  loading: false,
  error: undefined,
};

// Thunks
export const getCategories = createAsyncThunk<ApiResponse<string[]>>(
  "categories/getCategories",
  async () => {
    const response = await fetchCategories();
    return response;
  }
);

// Slice
const categoriesSlice = createSlice({
  name: "caegories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(getCategories.rejected, (state) => {
        state.loading = initialState.loading;
        state.error = "Failure to get categories";
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<ApiResponse<string[]>>) => {
          const { success, error, data } = action.payload;
          state.loading = initialState.loading;
          state.error = error || initialState.error;
          if (success) {
            state.data = data || [];
          }
        }
      );
  },
});

export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
