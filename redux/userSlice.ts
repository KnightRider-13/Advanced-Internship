import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    username: any,
    email: any,
    uid: any
}

const initialState: ModalState = {
    username: null,
    email: null,
    uid: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            (state.username = action.payload.username),
            (state.email = action.payload.email),
            (state.uid = action.payload.uid)
        },

        signOutUser: (state) => {
        (state.username = null),
        (state.email = null),
        (state.uid = null)
        }
    }
})

export const {setUser, signOutUser} = userSlice.actions;

export default userSlice.reducer;
