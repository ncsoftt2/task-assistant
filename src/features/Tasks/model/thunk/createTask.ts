import {setAppStatusAC} from "app/service/slice/app-reducer";
import {handleNetworkError, handleServerError} from "common/utils";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {FieldsErrorsType} from "common/types"
import {CreateTaskResponse, TaskType} from "features/Tasks/api/taskApi.types";
import { tasksAPI } from "features/Tasks/api/taskApi";
import {ResultCode} from "common/enums";

export const createTaskTC = createAsyncThunk<TaskType,{id:string,payload: CreateTaskResponse},{
    rejectValue: {errors: string[],fieldsErrors?: [FieldsErrorsType]}
}>(
    'task/createTask',
    async ({id,payload},{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:"loading"}))
        try {
            const response = await tasksAPI.createTask(id,payload)
            if(response.data.resultCode === ResultCode.SUCCESS) {
                dispatch(setAppStatusAC({status:'succeeded'}))
                return response.data.data.item
            } else {
                handleServerError(response.data,dispatch)
                return rejectWithValue({errors: response.data.messages,fieldsErrors: response.data.fieldsErrors})
            }
        } catch (e) {
            const err = e as {message: string}
            handleNetworkError(err,dispatch)
            return rejectWithValue({errors: [err.message]})
        }
    }
)
