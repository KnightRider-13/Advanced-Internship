import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    loginModalOpen: boolean;
    signUpModalOpen: boolean;
}

const initialState: ModalState = {
    signUpModalOpen: false,
    loginModalOpen: false,
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openSignupModal: (state) => {
            state.signUpModalOpen = true;
            state.loginModalOpen = false;
        },
        closeSignupModal: (state) => {
            state.signUpModalOpen = false;
        },
        openLoginModal: (state) => {
            state.loginModalOpen = true;
            state.signUpModalOpen = false;
        },
        closeLoginModal: (state) => {
            state.loginModalOpen = false;
        }
    }
})

export const {openSignupModal, closeSignupModal, openLoginModal, closeLoginModal} = modalSlice.actions

export default modalSlice.reducer