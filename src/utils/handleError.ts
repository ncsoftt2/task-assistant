import {Dispatch} from "redux";
import {ReturnResponseType} from "../api/api-types";
import {setAppErrorAC, setAppStatusAC} from "../store/reducers/app/slice/app-reducer";

export const handleServerError = <D>(data: ReturnResponseType<D>, dispatch:Dispatch) => {
    if(data.messages.length) {
        dispatch(setAppErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error:'Max length 100'}))
    }
    dispatch(setAppStatusAC({status:'failed'}))
}

export const handleNetworkError = (e:{message:string}, dispatch:Dispatch) => {
    dispatch(setAppStatusAC({status:'failed'}))
    dispatch(setAppErrorAC({error:e.message}))
}