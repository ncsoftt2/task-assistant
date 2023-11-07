import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginTC} from "../thunk/login";
import {logoutTC} from "../thunk/logout";

type InitialStateType = {
    isAuth: boolean
}
const initialState:InitialStateType = {
    isAuth: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedIn: (state,action:PayloadAction<{value: boolean}>) => {
            state.isAuth = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled,(state,_) => {
            state.isAuth = true
        })
        builder.addCase(logoutTC.fulfilled,(state,_) => {
            state.isAuth = false
        })
    }
})


export const authReducer = authSlice.reducer
export const {setIsLoggedIn} = authSlice.actions

