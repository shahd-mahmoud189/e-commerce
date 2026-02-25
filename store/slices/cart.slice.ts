import CartResponseType, { CartProductType } from "@/types/cartItem.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartState = {
    numberOfCartItems: number,
    products: CartProductType[],
    totalPrice: number,
    cartId: string | null,
}

const initialState : CartState = {
    numberOfCartItems: 0,
    products: [],
    totalPrice: 0,
    cartId: null,
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        setCartItems: function(state,action:PayloadAction<CartResponseType>){
            state.cartId = action.payload.cartId
            state.totalPrice = action.payload.data.totalCartPrice
            state.numberOfCartItems = action.payload.numOfCartItems
            state.products = action.payload.data.products
        },

        removeProduct: function(state, action:PayloadAction<{id:string}>){
            const productId = action.payload.id
            const removedItem = state.products.find((item)=>item.product._id === productId)

            if(removedItem){
                state.products = state.products.filter((product)=>product.product._id !== productId)
                state.numberOfCartItems = state.products.length
                state.totalPrice -= removedItem.price * removedItem.count
            }
        },

        clearCart: function(state){
            state.numberOfCartItems = 0,
            state.products = [],
            state.cartId = null,
            state.totalPrice = 0
        }
    }
})

export const cartReducer = CartSlice.reducer
export const {setCartItems, removeProduct, clearCart} = CartSlice.actions