import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cart: [],
    cartQty: 0
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
            state.cartQty = state.cart.length;
            toast.success('Thêm vào giỏ hàng thành công');
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
