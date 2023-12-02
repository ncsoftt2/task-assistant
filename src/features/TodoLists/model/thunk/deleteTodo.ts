import {createAsyncThunk} from "@reduxjs/toolkit";
import {todoListAPI} from "features/TodoLists/api/todoApi";
import {ResultCode} from "common/enums";

export const deleteTodoTC = createAsyncThunk<string, string>(
    'todo/deleteTodo',
    async (id, {rejectWithValue}) => {
        const response = await todoListAPI.deleteTodoList(id)
        if (response.data.resultCode === ResultCode.SUCCESS) {
            return id
        } else {
            return rejectWithValue(response.data)
        }
    }
)
