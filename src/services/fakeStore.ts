import axios, { AxiosError, AxiosResponse } from "axios";
import {
  ProductProps,
  ProductSchema,
  ProductUpdateProps,
} from "@/types/productSchema";

const BASE_URL = "https://fakestoreapi.com";

export type ApiResponse<T> = {
  success: boolean;
  error?: string;
  data: T | null;
};

const deliverResponse = (response: AxiosResponse) => {
  return { success: true, data: response.data };
};

const deliverError = (error: AxiosError | string) => {
  const errorMessage = axios.isAxiosError(error) ? error.message : error;
  return {
    success: false,
    data: null,
    error: errorMessage || "Unknown error occurred",
  };
};

export const fetchProduct = async (
  id: number | string
): Promise<ApiResponse<ProductProps>> => {
  return axios
    .get(`${BASE_URL}/products/${id}`)
    .then((response) =>
      response.data
        ? deliverResponse(response)
        : deliverError("Product not found")
    )
    .catch((error) => deliverError(error));
};

export const fetchProducts = async (
  limit: number | undefined
): Promise<ApiResponse<ProductProps[]>> => {
  const limitQueryString = limit ? `?limit=${limit}` : "";
  return axios
    .get(`${BASE_URL}/products${limitQueryString}`)
    .then((response) => deliverResponse(response))
    .catch((error) => deliverError(error));
};

export const addProduct = async (
  product: ProductSchema
): Promise<ApiResponse<ProductProps>> => {
  return axios
    .post(`${BASE_URL}/products`, product, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) =>
      response.data
        ? deliverResponse(response)
        : deliverError("Error on create product")
    )
    .catch((error) => deliverError(error));
};

export const editProduct = async (
  product: ProductUpdateProps
): Promise<ApiResponse<ProductProps>> => {
  return axios
    .put(`${BASE_URL}/products/${product.id}`, product, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) =>
      response.data
        ? deliverResponse(response)
        : deliverError("Error on update product")
    )
    .catch((error) => deliverError(error));
};

export const removeProduct = async (
  id: number | string
): Promise<ApiResponse<ProductProps>> => {
  return axios
    .delete(`${BASE_URL}/products/${id}`)
    .then((response) =>
      response.data
        ? deliverResponse(response)
        : deliverError("Error on delete product")
    )
    .catch((error) => deliverError(error));
};

export const fetchCategories = async (): Promise<ApiResponse<string[]>> => {
  return axios
    .get(`${BASE_URL}/products/categories`)
    .then((response) => {
      return response.data
        ? deliverResponse(response)
        : deliverError("Categories not found");
    })
    .catch((error) => deliverError(error));
};
