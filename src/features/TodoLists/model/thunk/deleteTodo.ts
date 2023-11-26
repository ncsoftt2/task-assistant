import {handleNetworkError, handleServerError} from "common/utils"
import {createAsyncThunk} from "@reduxjs/toolkit";
import {todoListAPI} from "features/TodoLists/api/todoApi";
import {ResultCode} from "common/enums";
import { todoActionsCreators } from "../slice/todoSlice";
import {appActions} from "app/app.reducer";

export const deleteTodoTC = createAsyncThunk<string, string,{rejectValue:{errors:string[]}}>(
    'todo/deleteTodo',
    async (id,{dispatch,rejectWithValue}) => {
        dispatch(appActions.setAppStatusAC({status:'loading'}))
        dispatch(todoActionsCreators.changeTodoStatusAC({todoId:id,entityStatus:'loading'}))
        try {
            const response = await todoListAPI.deleteTodoList(id)
            if(response.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatusAC({status:'succeeded'}))
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
