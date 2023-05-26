import React from "react"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const LoginApiSlice=createApi({
    reducerPath: 'LoginApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://dummyjson.com'
    }),
    tagTypes: ['Post'],
    endpoints: (builder)=>({
       AddLogin: builder.mutation({
            query:payload=>({
                url:'/auth/login',
                method: 'POST',
                body:payload,
            }),
            invalidatesTags: [{ type: 'Post', id: 'LIST' }],
       })
    })
})

export const {useAddLoginMutation} = LoginApiSlice