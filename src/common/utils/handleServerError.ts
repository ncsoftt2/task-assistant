import { ReturnResponseType } from "common/types"
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "app/service/slice/app-reducer";

export const handleServerError = <D>(data: ReturnResponseType<D>, dispatch:Dispatch) => {
    if(data.messages.length) {
        dispatch(setAppErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({ error: "Some error occurred" }))
    }
    dispatch(setAppStatusAC({status:'failed'}))
}

