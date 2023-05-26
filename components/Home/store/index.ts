import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


export const GetAllProductApi=createApi({
    reducerPath: "GetAllProducts",
    baseQuery: fetchBaseQuery({
        baseUrl:'https://dummyjson.com'
    }),
    tagTypes: ['GET'],
    endpoints: (builder)=>({
        GetAllProduct: builder.query({
            query:()=>"/products?limit=10"
        }),

        GetAllCategory: builder.query({
            query:()=>"/products/categories"
        })
    })
})

export const {useGetAllProductQuery, useGetAllCategoryQuery}= GetAllProductApi