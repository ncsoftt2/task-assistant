import {AnyAction, createSlice} from "@reduxjs/toolkit";
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
            .addMatcher(
                (action: AnyAction) => {
                    return action.type === 'app/initializeMe/fulfilled' ||
                        action.type === 'auth/logout/fulfilled' ||
                        action.type === 'auth/login/fulfilled';
                },
                (state,action) => {
                    state.userData = action.payload
                }
            )
    }
})

export const authReducer = slice.reducer
export const authActionsCreators = slice.actions
export const authThunks = {login, logout, initializeMe}