import { BaseResponseType } from "common/types"
import {Dispatch} from "redux";
import {appActions} from "app/app.reducer";

export const handleServerError = <D>(data: BaseResponseType<D>, dispatch:Dispatch, showError = true) => {
    if(showError) {
        dispatch(appActions.setAppErrorAC({error: data.messages.length ? data.messages[0] : "Some error occurred" }))
    }
    dispatch(appActions.setAppStatusAC({status:'failed'}))
}