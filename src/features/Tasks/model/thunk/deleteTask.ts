import {setAppStatusAC} from "app/model/slice/app-reducer";
import {handleNetworkError, handleServerError} from "common/utils"
import {createAsyncThunk} from "@reduxjs/toolkit";
import {tasksAPI} from "features/Tasks/api/taskApi";
import {ResultCode} from "common/enums";

type PayloadType = { todoId: string, taskId: string };
export const deleteTaskTC = createAsyncThunk<PayloadType,PayloadType,{
    rejectValue: {errors: string[]}
}>(
    'task/deleteTask',
    async ({todoId,taskId},{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:"loading"}))
        try {
            const response = await tasksAPI.deleteTask(todoId,taskId)
            if(response.data.resultCode === ResultCode.SUCCESS) {
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
