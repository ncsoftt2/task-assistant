import {setAppStatusAC} from "app/service/slice/app-reducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {handleNetworkError} from "common/utils"
import {TodoListType} from "features/TodoLists/api/todoApi.types";
import { todoListAPI } from "features/TodoLists/api/todoApi";

export const fetchTodoTC = createAsyncThunk<TodoListType[],void,{rejectValue:{errors:string[]}}>(
    'todo/fetchTodo',
    async (_,{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:'loading'}))
        try {
            const response = await todoListAPI.getTodoList()
            dispatch(setAppStatusAC({status:'succeeded'}))
            return response.data
        } catch (e) {
            const err = e as { message:string}
            handleNetworkError(err,dispatch)
            return rejectWithValue({errors:[err.message]})
        }
    }
)
