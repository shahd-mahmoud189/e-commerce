import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth.slice";
import { AuthState } from "./slices/auth.slice";
import { cartReducer, CartState } from "./slices/cart.slice";
import { whishlistReducer, WhishlistState } from './slices/whishlist.slice';

export type PreloadedState = {
  auth: AuthState;
  cart: CartState;
  whishlist: WhishlistState
};

export function createStore(preloadedState: PreloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      whishlist: whishlistReducer
    },
    preloadedState,
  });

  return store;
}
export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore['dispatch']

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()