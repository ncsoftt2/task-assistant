import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../store/reducers/app/app-actions";
import {ReturnResponseType} from "../api/api-types";

export const handleServerError = <D>(data: ReturnResponseType<D>, dispatch:Dispatch) => {
    if(data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Max length 100'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleNetworkError = (e:{message:string}, dispatch:Dispatch) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(e.message))
}