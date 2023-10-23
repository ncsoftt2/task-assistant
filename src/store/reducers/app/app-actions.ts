import {RequestStatusType} from "./app-reducer";


export type AppActions =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
export const setAppStatusAC = (status: RequestStatusType) => ({type:"APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: string | null) => ({type:"APP/SET-ERROR", error} as const)