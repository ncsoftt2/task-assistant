import {handleNetworkError, handleServerError} from "common/utils"
import {createAsyncThunk} from "@reduxjs/toolkit";
import {FieldsErrorsType} from "common/types"
import {todoListAPI} from "features/TodoLists/api/todoApi";
import {ResultCode} from "common/enums";
import {appActions} from "app/app.reducer";

type PayloadType = { todoId: string, title: string };
export const updateTodoTitleTC = createAsyncThunk<PayloadType,PayloadType,
    {rejectValue:{errors:string[],fieldsErrors?:[FieldsErrorsType]}}>(
    'todo/updateTodoTitle',
    async ({title,todoId},{dispatch,rejectWithValue}) => {
        dispatch(appActions.setAppStatusAC({status:'loading'}))
        const response = await todoListAPI.updateTodoListTitle(todoId,title)
        try {
            if(response.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatusAC({status:'succeeded'}))
                return {todoId,title}
            } else {
                handleServerError(response.data,dispatch)
                return rejectWithValue({errors: response.data.messages,fieldsErrors:response.data.fieldsErrors})
            }
        } catch (e) {
            const err = e as {message: string}
            handleNetworkError(err,dispatch)
            return rejectWithValue({errors:[err.message]})
        }
    }
)