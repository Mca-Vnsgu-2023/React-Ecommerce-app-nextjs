import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const GetSaleProductsApi= createApi({
    reducerPath: "GetSaleProducts",
    baseQuery: fetchBaseQuery({
        baseUrl:'https://dummyjson.com'
    }),
    tagTypes: ['GET'],
    endpoints: (builder)=>({
        GetSaleProducts: builder.query({
            query:()=>"/products?limit=60&skip=10"
        }),
        GetProductByCategory: builder.query({
            query:({categoryName})=> `/products/category/${categoryName}`
        }),
        GetProductById: builder.query({
            query:({productId})=> `/products/${productId}`
        })
    })
})

export const {useGetSaleProductsQuery, 
                useGetProductByCategoryQuery, 
                useGetProductByIdQuery}=GetSaleProductsApi