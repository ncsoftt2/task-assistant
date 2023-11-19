import {setAppStatusAC} from "app/service/slice/app-reducer";
import {handleNetworkError, handleServerError} from "common/utils"
import {createAsyncThunk} from "@reduxjs/toolkit";
import {todoListAPI} from "features/TodoLists/api/todoApi";
import { TodoListType } from "features/TodoLists/api/todoApi.types";
import {ResultCode} from "common/enums";

export const createTodoTC = createAsyncThunk<TodoListType,string,{rejectValue:{errors:string[]}}>(
    'todo/createTodo',
    async (title,{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:'loading'}))
        try {
            const response = await todoListAPI.createTodoList(title)
            if(response.data.resultCode === ResultCode.SUCCESS) {
                dispatch(setAppStatusAC({status:'succeeded'}))
                return response.data.data.item
            } else {
                handleServerError(response.data,dispatch)
                return rejectWithValue({errors:response.data.messages})
            }
        } catch (e) {
            const err = e as {message:string}
            handleNetworkError(err,dispatch)
            return rejectWithValue({errors:[err.message]})
        }
    }
)
