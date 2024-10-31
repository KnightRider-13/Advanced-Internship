import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signUpModalOpen: false,
    loginModalOpen: false,
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {

    }
})

export const {} = modalSlice.actions

export default modalSlice.reducer