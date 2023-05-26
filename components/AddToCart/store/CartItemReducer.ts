'use client';
import { RootState } from '@/Store/Store';
import { ICartItem, IProduct } from '@/types/productType';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

export interface CartState {
    cartItems: ICartItem[]
}

const loadCartItemsFromLocalStorage = (): [] => {
    try {
        if (typeof window !== 'undefined') {
            const storedItems = localStorage.getItem('cartItem');
            if (storedItems) {
                return JSON.parse(storedItems);
            }
        }
    } catch (error) {
        console.error('Error loading cartItem items from local storage:', error);
    }
    return [];
};


const initialState: CartState = {
    cartItems: loadCartItemsFromLocalStorage(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<IProduct>) => {
            const cartItem = state.cartItems.find(
                (el) => el.product.id === action.payload.id
            );
            if (cartItem) {
                cartItem.qty++;
                localStorage.setItem('cartItem', JSON.stringify(state.cartItems));
            }
            else {
                state.cartItems.push({
                    product: action.payload,
                    qty: 1,
                });
                localStorage.setItem('cartItem', JSON.stringify(state.cartItems));
            }
        },

        decrement: (state, action: PayloadAction<IProduct>) => {
            const cartItem = state.cartItems.find(
                (el: any) => el.product.id === action.payload.id
            );
            if (cartItem) {
                cartItem.qty--;
                if (cartItem.qty === 0) {
                    state.cartItems = state.cartItems.filter(
                        (el) => el.product.id !== action.payload.id
                    );
                }
            }
            localStorage.setItem('cartItem', JSON.stringify(state.cartItems));
        },

        clearItem: (state, action: PayloadAction<IProduct>) => {
            sessionStorage.setItem("OrderItem", JSON.stringify(action.payload))
            state.cartItems = []
            localStorage.setItem('cartItem', JSON.stringify(state.cartItems));
        },

    }
})

const cartItems = (state: RootState) => state.cart.cartItems;

export const productQtyInCartSelector = createSelector(
    [cartItems, (cartItems, productId: number) => productId],
    (cartItems, productId) =>
        cartItems.find((el: any) => el.product.id === productId)?.qty
);

export const totalCartItemsSelector = createSelector(
    [cartItems],
    (cartItems) =>
        cartItems.reduce(
            (total: number, curr: ICartItem) =>
                (total += curr.qty),
            0
        )
);
export const totalPriceSelector = createSelector(
    [cartItems],
    (cartItems) =>
        cartItems.reduce(
            (total: number, curr: ICartItem) =>
                (total += curr.qty * curr.product.price),
            0
        )
);


export const { increment, decrement, clearItem } = cartSlice.actions

export default cartSlice.reducer