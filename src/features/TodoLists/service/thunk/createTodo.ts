import {setAppStatusAC} from "../../../../app/service/slice/app-reducer";
import {todoListAPI, TodoListType} from "../../../../api/todo-list-api";
import {handleNetworkError, handleServerError} from "../../../../utils/handleError";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const createTodoTC = createAsyncThunk<TodoListType,string,{rejectValue:{errors:string[]}}>(
    'todo/createTodo',
    async (title,{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:'loading'}))
        try {
            const response = await todoListAPI.createTodoList(title)
            if(response.data.resultCode === 0) {
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
