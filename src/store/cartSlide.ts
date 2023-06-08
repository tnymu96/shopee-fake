import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    cartTotalQty: 0
};

// Config slice
export const cartSlide = createSlice({
    name: "cartSlide",
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const find = state.cart.findIndex(p => p.id === action.payload.id);
            if (find >= 0)
                state.cart[find].quantity += 1;
            else {
                const tmp = { ...action.payload, quantity: 1 }
                state.cart.push(tmp);
            }
        },
        removeInCart: (state, action) => {
            //state.cart = state.cart.filter(item => item.id !== action.payload.id);
        },
    }
});

// Export actions
export const { addToCart, removeInCart } = cartSlide.actions;

// Export reducer
export default cartSlide.reducer;
