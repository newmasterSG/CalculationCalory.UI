import { createApi } from "@reduxjs/toolkit/query/react";
import { CreateProductCommand, ProductDTO } from "../models/product";
import { baseQueryWithReauth } from "./basesQueries/baseQueryWithReauth";
import { PagedProductResultDTO } from "./apiResponses/PagedProductResultDTO";

export const productApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProducts: builder.query<
      PagedProductResultDTO,
      { page?: number; pageSize?: number }
    >({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: "products",
        params: { page, pageSize },
      }),
    }),

    createProduct: builder.mutation<ProductDTO, CreateProductCommand>({
      query: (command) => ({
        url: "products",
        method: "POST",
        body: command,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productApi;
