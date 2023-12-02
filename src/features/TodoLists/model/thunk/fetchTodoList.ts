import {createAsyncThunk} from "@reduxjs/toolkit";
import {TodoListType} from "features/TodoLists/api/todoApi.types";
import {todoListAPI} from "features/TodoLists/api/todoApi";

export const fetchTodoTC = createAsyncThunk<TodoListType[], void, { rejectValue: { errors: string[] } }>(
    'todo/fetchTodo',
    async () => {
        const response = await todoListAPI.getTodoList()
        return response.data
    }
)
