import {setAppStatusAC} from "../../app/slice/app-reducer";
import {todoListAPI} from "../../../../api/todo-list-api";
import {handleNetworkError, handleServerError} from "../../../../utils/handleError";
import {changeTodoStatusAC} from "../slice/todo-list-reducer";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const deleteTodoTC = createAsyncThunk<string, string,{rejectValue:{errors:string[]}}>(
    'todo/deleteTodo',
    async (id,{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:'loading'}))
        dispatch(changeTodoStatusAC({todoId:id,entityStatus:'loading'}))
        try {
            const response = await todoListAPI.deleteTodoList(id)
            if(response.data.resultCode === 0) {
                dispatch(setAppStatusAC({status:'succeeded'}))
                return id
            } else {
                handleServerError(response.data,dispatch)
                return rejectWithValue({errors: response.data.messages})
            }
        } catch (e) {
            const err = e as {message:string}
            handleNetworkError(err,dispatch)
            return rejectWithValue({errors:[err.message]})
        }
    }
)
