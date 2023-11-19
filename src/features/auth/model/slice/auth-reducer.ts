import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginTC} from "features/auth/model/thunk/login";
import {logoutTC} from "features/auth/model/thunk/logout";


type InitialStateType = {
    isAuth: boolean
}
const initialState:InitialStateType = {
    isAuth: false
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedIn: (state,action:PayloadAction<{value: boolean}>) => {
            state.isAuth = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginTC.fulfilled,(state,_) => {
            state.isAuth = true
        })
            .addCase(logoutTC.fulfilled,(state,_) => {
            state.isAuth = false
        })
    }
})


export const authReducer = slice.reducer
export const authActionsCreators = slice.actions
export const authThunks = {loginTC,logoutTC}