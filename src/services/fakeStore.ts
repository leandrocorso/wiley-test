import axios from "axios";
import { ProductSchema, ProductUpdateProps } from "@/types/productSchema";

const BASE_URL = "https://fakestoreapi.com";

export interface PaginationProps {
  page?: number;
  limit?: number;
}

const responseNotOk = (because: string): Error => {
  throw new Error(`Network response was not ok ${because}`);
};

export const fetchProduct = async (id: number | string) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data || responseNotOk("to get a product");
  } catch (error) {
    return error;
  }
};

export const fetchProducts = async (limit: number | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}/products?limit=${limit}`);
    return response.data || responseNotOk("to get the products");
  } catch (error) {
    return error;
  }
};

export const addProduct = async (product: ProductSchema) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, product, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data || responseNotOk("to create a product");
  } catch (error) {
    return error;
  }
};

export const editProduct = async (product: ProductUpdateProps) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/products/${product.id}`,
      product,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data || responseNotOk("to update a product");
  } catch (error) {
    return error;
  }
};

export const removeProduct = async (id: number | string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${id}`);
    return response.data || { id: +id };
  } catch (error) {
    return error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    return response.data || responseNotOk("to get the categories");
  } catch (error) {
    return error;
  }
};
