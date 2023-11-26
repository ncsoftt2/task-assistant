import {createSlice} from "@reduxjs/toolkit";
import {login} from "features/auth/model/thunk/login";
import {logout} from "features/auth/model/thunk/logout";
import {initializeMe} from "features/auth/model/thunk/initializeMe";

export type UserDataType = {
    id?: number | null
    login?: string | null
    email: string | null
}

type InitialStateType = {
    userData: UserDataType | null
}
const initialState: InitialStateType = {
    userData: {} as UserDataType | null
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, _) => {
                state.userData = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.userData = action.payload
            })
            .addCase(login.rejected, (state, _) => {
                state.userData = null
            })
            .addCase(logout.fulfilled, (state, _) => {
                state.userData = null
            })
            .addCase(initializeMe.fulfilled, (state, action) => {
                state.userData = action.payload
            })
    }
})

export const authReducer = slice.reducer
export const authActionsCreators = slice.actions
export const authThunks = {login, logout, initializeMe}