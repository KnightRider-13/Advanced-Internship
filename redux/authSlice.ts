import { Action, createSlice } from "@reduxjs/toolkit";

interface ModalState{
    isAuthenticated: boolean;
    premiumStatus: string;
}

const initialState: ModalState = {
    isAuthenticated: false,
    premiumStatus: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.premiumStatus = ""
        },
        setPremiumStatus: (state, action) => {
            state.premiumStatus = action.payload;
        }
    }
})

export const {login, logout, setPremiumStatus} = authSlice.actions;
export default authSlice.reducer;