import {setAppStatusAC} from "../../app/slice/app-reducer";
import {tasksAPI, TaskType} from "../../../../api/task-api";
import {handleNetworkError} from "../../../../utils/handleError";

import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchTasksTC = createAsyncThunk<{ tasks:TaskType[], id:string } | void,string,{rejectValue: {errors: string[]}}>(
    'task/fetchTasks',
    async (id,{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:'loading'}))
        try {
            const response = await tasksAPI.getTasks(id)
            dispatch(setAppStatusAC({status:"succeeded"}))
            return {tasks:response.data.items,id}
        } catch (e) {
            const err = e as {message: string}
            handleNetworkError(err,dispatch)
            return rejectWithValue({errors: [err.message]})
        }
    }
)
