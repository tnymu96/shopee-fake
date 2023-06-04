import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quantity: 0
};

// Config slice
export const cartSlide = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.quantity = state.quantity++ || initialState.quantity;
        },
        removeInCart: (state, action) => {
            state.quantity = (initialState.quantity > 0 ? action.payload.quantity-- : 0) || initialState.quantity;
        },
    }
});

// Export actions
export const { addToCart, removeInCart } = cartSlide.actions;

export const selectQuantityCart = state => state.quantity;

// Export reducer
export default cartSlide.reducer;
