import { WishlistItem, WishlistResponse } from "@/types/whishlist.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WhishlistState = {
    numberOfWhishlistItems: number,
    products: WishlistItem[]
}

const initialState :WhishlistState = {
    numberOfWhishlistItems: 0,
    products: []
};

const whishlistSlice = createSlice({
    name: "whishlist",
    initialState,
    reducers: {
        setWishlistItems: function(state, action:PayloadAction<WishlistResponse>){
            state.numberOfWhishlistItems = action.payload.count,
            state.products = action.payload.data
        },

        removeItem: function(state,action :PayloadAction<{id:string}>){
            const itemId = action.payload.id
            const removedItem = state.products.find((product)=>product._id === itemId)

            if(removedItem){
                state.products = state.products.filter((product)=>product._id !== itemId)
                state.numberOfWhishlistItems = state.products.length
            }
        }
    },
});

export const whishlistReducer = whishlistSlice.reducer
export const {setWishlistItems, removeItem} = whishlistSlice.actions