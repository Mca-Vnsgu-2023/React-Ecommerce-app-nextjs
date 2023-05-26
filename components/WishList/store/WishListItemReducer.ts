'use client';
import { RootState } from '@/Store/Store';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';


const loadWishlistItemsFromLocalStorage = (): number[] => {
  try {
    if (typeof window !== 'undefined') {
      const storedItems = localStorage.getItem('wishlist');
      if (storedItems) {
        return JSON.parse(storedItems);
      }
    }
  } catch (error) {
    console.error('Error loading wishlist items from local storage:', error);
  }
  return [];
};


interface WishlistState {
  wishItems: number[];
}

const initialState: WishlistState = {
  wishItems: loadWishlistItemsFromLocalStorage(),
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<number>) => {
      state.wishItems.push(action.payload)
      localStorage.setItem('wishlist', JSON.stringify(state.wishItems));
    },
    removeItemFromWishlist: (state, action: PayloadAction<number>) => {
      state.wishItems = state.wishItems.filter((itemId: any) => itemId !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.wishItems));
    },
  }
})

export const selectWishlistItems = (state: RootState) => state.wishList.wishItems;

export const totalWishListItem = createSelector(
  selectWishlistItems,
  (items) => items.length
);

export const { addToWishlist, removeItemFromWishlist } = wishListSlice.actions

export default wishListSlice.reducer