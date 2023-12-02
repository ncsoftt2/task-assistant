import {CreateTaskResponse, TaskType} from "features/Tasks/api/taskApi.types";
import {tasksAPI} from "features/Tasks/api/taskApi";
import {ResultCode} from "common/enums";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";

export const createTask = createAppAsyncThunk<TaskType,{ id: string, payload: CreateTaskResponse }>(
    'task/createTask',
    async ({id, payload}, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        const response = await tasksAPI.createTask(id, payload)
        if (response.data.resultCode === ResultCode.SUCCESS) {
            return response.data.data.item
        } else {
            return rejectWithValue(response.data)
        }
    }
)