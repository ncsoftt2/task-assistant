import {TaskApiType} from "../api/task-api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../store/reducers/app/app-actions";

export const handleServerErrorTask = <D>(data: TaskApiType<D>, dispatch:Dispatch) => {
    if(data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Max length 100'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleNetworkErrorTask = (e:{message:string},dispatch:Dispatch) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(e.message))
}