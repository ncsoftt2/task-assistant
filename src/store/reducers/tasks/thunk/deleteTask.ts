import {setAppStatusAC} from "../../app/slice/app-reducer";
import {tasksAPI} from "../../../../api/task-api";
import {handleNetworkError, handleServerError} from "../../../../utils/handleError";
import {createAsyncThunk} from "@reduxjs/toolkit";

type PayloadType = { todoId: string, taskId: string };
export const deleteTaskTC = createAsyncThunk<PayloadType,PayloadType,{
    rejectValue: {errors: string[]}
}>(
    'task/deleteTask',
    async ({todoId,taskId},{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:"loading"}))
        try {
            const response = await tasksAPI.deleteTask(todoId,taskId)
            if(response.data.resultCode === 0) {
                dispatch(setAppStatusAC({status:'succeeded'}))
                return {taskId,todoId}
            } else {
                handleServerError(response.data,dispatch)
                return rejectWithValue({errors: response.data.messages})
            }
        } catch (e) {
            const err = e as {message: string}
            handleNetworkError(err,dispatch)
            return rejectWithValue({errors:[err.message]})
        }
    }
)
