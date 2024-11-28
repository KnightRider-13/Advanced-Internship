import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "./modalSlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        modal: modalSlice,
        auth: authSlice,
        user: userSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;