import CartItemReducer from "@/components/AddToCart/store/CartItemReducer";
import { GetAllProductApi } from "@/components/Home/store";
import { GetSaleProductsApi } from "@/components/ProductCard/store";
import { LoginApiSlice } from "@/components/UserLogin/store";
import WishListItemReducer from "@/components/WishList/store/WishListItemReducer";
import ThemeReducer from "@/layout/MainLayout/ThemeReducer";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector as useReduxSelector,TypedUseSelectorHook, useDispatch } from "react-redux";


const reducer={
    theme:ThemeReducer,
    cart:CartItemReducer,
    wishList:WishListItemReducer,
    [LoginApiSlice.reducerPath]: LoginApiSlice.reducer,
    [GetAllProductApi.reducerPath]: GetAllProductApi.reducer,
    [GetSaleProductsApi.reducerPath]:GetSaleProductsApi.reducer
}

const reducermiddleware=[
    LoginApiSlice.middleware,
    GetAllProductApi.middleware,
    GetSaleProductsApi.middleware
]


export const Store=configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
         ...reducermiddleware
   ]),
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

export const useAppdispatch:()=>AppDispatch=useDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector