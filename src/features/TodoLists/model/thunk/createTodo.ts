import {createAsyncThunk} from "@reduxjs/toolkit";
import {todoListAPI} from "features/TodoLists/api/todoApi";
import {TodoListType} from "features/TodoLists/api/todoApi.types";
import {ResultCode} from "common/enums";

export const createTodoTC = createAsyncThunk<TodoListType, string>(
    'todo/createTodo',
    async (title, {rejectWithValue}) => {
        const response = await todoListAPI.createTodoList(title)
        if (response.data.resultCode === ResultCode.SUCCESS) {
            return response.data.data.item
        } else {
            return rejectWithValue(response.data)
        }
    }
)
