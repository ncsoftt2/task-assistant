import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "app/service/slice/app-reducer";
import axios from "axios";

export const handleNetworkError = (err:unknown, dispatch:Dispatch) => {
    let errorMessage = "Some error occurred";

    if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err?.message || errorMessage;
    } else if (err instanceof Error) {
        errorMessage = `Native error: ${err.message}`;
    } else {
        errorMessage = JSON.stringify(err);
    }
    dispatch(setAppErrorAC({ error: errorMessage }));
    dispatch(setAppStatusAC({ status: "failed" }));
}