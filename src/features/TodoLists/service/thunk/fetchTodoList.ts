import {setAppStatusAC} from "../../../../app/service/slice/app-reducer";
import {todoListAPI, TodoListType} from "../../../../api/todo-list-api";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {handleNetworkError} from "../../../../utils/handleError";

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
