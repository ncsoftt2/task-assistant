import {AuthActions} from "./auth-actions";

type InitialStateType = {
    isAuth: boolean
}
const initialState:InitialStateType = {
    isAuth: false
}

export const authReducer = (state:InitialStateType = initialState, action:AuthActions):InitialStateType => {
    switch (action.type) {
        case "SET-IS-LOGGED-IN":
            return {
                ...state,
                isAuth: action.value
            }
        default:return  state
    }
}