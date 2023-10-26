import {AppActions} from "./app-actions";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialStateType = {
    error: string | null
    status: RequestStatusType
    initialized: boolean
}

const initialState:AppInitialStateType = {
    status: 'idle',
    error: null,
    initialized: false
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppActions): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state,error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state,initialized: action.value}
        default:
            return state
    }
}