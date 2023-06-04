import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.ts";
import cartReducer from "./cartSlide.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    }
});
