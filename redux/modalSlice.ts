import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    loginModalOpen: boolean;
    signUpModalOpen: boolean;
    passwordModalOpen: boolean;
}

const initialState: ModalState = {
    signUpModalOpen: false,
    loginModalOpen: false,
    passwordModalOpen: false
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
        },
        openPasswordModal: (state) => {
            state.passwordModalOpen = true;
        },
        closePasswordModal: (state) => {
            state.passwordModalOpen = false;
        }
    }
})

export const {openSignupModal, closeSignupModal, openLoginModal, closeLoginModal, openPasswordModal, closePasswordModal} = modalSlice.actions

export default modalSlice.reducer