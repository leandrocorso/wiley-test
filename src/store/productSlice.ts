import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ProductProps,
  ProductSchema,
  ProductUpdateProps,
} from "@/types/productSchema";
import { RootState } from "./store";

import {
  fetchProduct,
  fetchProducts,
  addProduct,
  editProduct,
  removeProduct,
  ApiResponse,
} from "@/services/fakeStore";

// Definindo a interface do estado
interface ProductsState {
  data: ProductProps[];
  current?: ProductProps;
  loading: boolean;
  error?: string;
}

const initialState: ProductsState = {
  data: [],
  current: undefined,
  loading: false,
  error: undefined,
};

// Thunks
export const getProducts = createAsyncThunk<
  ApiResponse<ProductProps[]>,
  number | undefined
>("products/getProducts", async (limit: number | undefined) => {
  const response = await fetchProducts(limit);
  return response;
});

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id: number | string) => {
    const response = await fetchProduct(id);
    return response;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: ProductSchema) => {
    const result = await addProduct(product);
    return result;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: ProductUpdateProps) => {
    const response = await editProduct(product);
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number | string) => {
    const result = await removeProduct(id);
    return result;
  }
);

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentProduct: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = initialState.loading;
        state.error = "Failure to get products";
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<ApiResponse<ProductProps[]>>) => {
          const { success, error, data } = action.payload;
          state.loading = initialState.loading;
          state.error = error || initialState.error;
          if (success && data) {
            state.data = data || [];
          }
        }
      )
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(getProduct.rejected, (state) => {
        state.loading = initialState.loading;
        state.error = "Failure to get product";
      })
      .addCase(
        getProduct.fulfilled,
        (state, action: PayloadAction<ApiResponse<ProductProps>>) => {
          const { error, success, data } = action.payload;
          state.loading = initialState.loading;
          state.error = error || initialState.error;
          if (data && success) {
            state.current = data;
          }
        }
      )
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(createProduct.rejected, (state) => {
        state.loading = initialState.loading;
        state.error = "Failure to create product";
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<ApiResponse<ProductProps>>) => {
          const { success, error, data } = action.payload;
          state.loading = initialState.loading;
          state.error = error || initialState.error;
          if (success && data) {
            state.data.push(data);
          }
        }
      )
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.loading = initialState.loading;
        state.error = "Failure to update product";
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<ApiResponse<ProductProps>>) => {
          const { success, error, data } = action.payload;
          state.loading = initialState.loading;
          state.error = error || initialState.error;
          if (success && data) {
            const index = state.data.findIndex((item) => item.id === data.id);
            state.data[index] = data;
          }
        }
      )
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = initialState.loading;
        state.error = "Failure to delete product";
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<ApiResponse<ProductProps>>) => {
          const { success, error, data } = action.payload;
          state.loading = initialState.loading;
          state.error = error || initialState.error;
          if (success && data) {
            state.data = state.data.filter((item) => item.id != data.id);
          }
        }
      );
  },
});

export const { setCurrentProduct } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
