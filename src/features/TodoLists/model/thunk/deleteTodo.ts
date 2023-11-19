import {setAppStatusAC} from "app/model/slice/app-reducer";
import {handleNetworkError, handleServerError} from "common/utils"
import {createAsyncThunk} from "@reduxjs/toolkit";
import {todoListAPI} from "features/TodoLists/api/todoApi";
import {todoListActions} from "features/TodoLists/index";
import {ResultCode} from "common/enums";

export const deleteTodoTC = createAsyncThunk<string, string,{rejectValue:{errors:string[]}}>(
    'todo/deleteTodo',
    async (id,{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:'loading'}))
        dispatch(todoListActions.changeTodoStatusAC({todoId:id,entityStatus:'loading'}))
        try {
            const response = await todoListAPI.deleteTodoList(id)
            if(response.data.resultCode === ResultCode.SUCCESS) {
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
