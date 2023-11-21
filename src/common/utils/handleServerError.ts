import { ReturnResponseType } from "common/types"
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "app/model/slice/app-reducer";

export const handleServerError = <D>(data: ReturnResponseType<D>, dispatch:Dispatch,showError = true) => {
    if(showError) {
        dispatch(setAppErrorAC({error: data.messages.length ? data.messages[0] : "Some error occurred" }))
    }
    dispatch(setAppStatusAC({status:'failed'}))
}

