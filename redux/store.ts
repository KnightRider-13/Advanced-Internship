import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "./modalSlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import sidebarSlice from "./sidebarSlice";

export const store = configureStore({
    reducer: {
        modal: modalSlice,
        auth: authSlice,
        user: userSlice,
        sidebar: sidebarSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;