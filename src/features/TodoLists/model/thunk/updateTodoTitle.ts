import {createAsyncThunk} from "@reduxjs/toolkit";
import {todoListAPI} from "features/TodoLists/api/todoApi";
import {ResultCode} from "common/enums";

type PayloadType = { todoId: string, title: string };
export const updateTodoTitleTC = createAsyncThunk<PayloadType,PayloadType>(
    'todo/updateTodoTitle',
    async ({title,todoId},{rejectWithValue}) => {
        const response = await todoListAPI.updateTodoListTitle(todoId,title)
        if(response.data.resultCode === ResultCode.SUCCESS) {
            return {todoId,title}
        } else {
            return rejectWithValue(response.data)
        }
    }
)