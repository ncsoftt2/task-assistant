import {setAppStatusAC} from "../../app/slice/app-reducer";
import {tasksAPI, TaskType} from "../../../../api/task-api";
import {handleNetworkError, handleServerError} from "../../../../utils/handleError";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {FieldsErrorsType} from "../../../../api/api-types";

export const createTaskTC = createAsyncThunk<TaskType | void,{id:string,title:string},{
    rejectValue: {errors: string[],fieldsErrors?: [FieldsErrorsType]}
}>(
    'task/createTask',
    async ({id,title},{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:"loading"}))
        try {
            const response = await tasksAPI.createTask(id,title)
            if(response.data.resultCode === 0) {
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
