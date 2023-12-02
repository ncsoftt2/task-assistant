import {tasksAPI} from "features/Tasks/api/taskApi";
import {ResultCode} from "common/enums";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";
import {DeleteTaskArgType} from "features/Tasks/api/taskApi.types";

export const deleteTask = createAppAsyncThunk<DeleteTaskArgType, DeleteTaskArgType>(
    'task/deleteTask',
    async (arg, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        const response = await tasksAPI.deleteTask(arg)
        if (response.data.resultCode === ResultCode.SUCCESS) {
            return arg
        } else {
            return rejectWithValue(response.data)
        }
    }
)
