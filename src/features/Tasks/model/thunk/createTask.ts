import {setAppStatusAC} from "app/model/slice/app-reducer";
import {handleNetworkError, handleServerError} from "common/utils";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {FieldsErrorsType} from "common/types"
import {CreateTaskResponse, TaskType} from "features/Tasks/api/taskApi.types";
import { tasksAPI } from "features/Tasks/api/taskApi";
import {ResultCode} from "common/enums";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";

export const createTaskTC = createAppAsyncThunk<TaskType,{id:string,payload: CreateTaskResponse}>(
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
                return rejectWithValue(null)
            }
        } catch (e) {
            const err = e as {message: string}
            handleNetworkError(err,dispatch)
            return rejectWithValue(null)
        }
    }
)
