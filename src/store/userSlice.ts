import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: ""
};

// Config slice
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.userName = action.payload.userName || initialState.userName;
            state.firstName = action.payload.firstName || initialState.firstName;
            state.lastName = action.payload.lastName || initialState.lastName;
            state.email = action.payload.email || initialState.email;
            state.avatar = action.payload.avatar || initialState.avatar;
        }
    }
});

// Export actions
export const { updateUser } = userSlice.actions;

// Select state userName, passWord from slice
export const selectCurrentUser = state => state.user;

export const selectFullName = state => state.user.firstName + " " + state.user.lastName;
export const selectAvatar = state => state.user.avatar;

// Export reducer
export default userSlice.reducer;
