import {setAppStatusAC} from "../../../../app/service/slice/app-reducer";
import {todoListAPI} from "../../../../api/todo-list-api";
import {handleNetworkError, handleServerError} from "../../../../utils/handleError";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {FieldsErrorsType} from "../../../../api/api-types";

type PayloadType = { todoId: string, title: string };
export const updateTodoTitleTC = createAsyncThunk<PayloadType,PayloadType,
    {rejectValue:{errors:string[],fieldsErrors?:[FieldsErrorsType]}}>(
    'todo/updateTodoTitle',
    async ({title,todoId},{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:'loading'}))
        const response = await todoListAPI.updateTodoListTitle(todoId,title)
        try {
            if(response.data.resultCode === 0) {
                dispatch(setAppStatusAC({status:'succeeded'}))
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