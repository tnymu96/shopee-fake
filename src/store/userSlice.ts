import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: ""
};

// Config slice
export const userSlice = createSlice({
    name: "userSlide",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.userName = action.payload.userName || initialState.userName;
        }
    }
});

// Export actions
export const { updateUser } = userSlice.actions;

export const selectCurrentUser = state => state.user;

// Export reducer
export default userSlice.reducer;
