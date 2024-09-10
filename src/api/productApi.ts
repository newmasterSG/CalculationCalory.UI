import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateProductCommand, ProductDTO } from '../models/product';
import { baseUrl } from '../constants';

export const productApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}` }),
    endpoints: (builder) => ({
        getProducts: builder.query<ProductDTO[], void>({
            query: () => 'products',
        }),

        createProduct: builder.mutation<ProductDTO, CreateProductCommand>({
            query: (command) => ({
                url: 'products',
                method: 'POST',
                body: command,
            }),
        }),
    }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productApi;