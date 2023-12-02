import {UpdateTaskArgType, UpdateTaskModelType} from "features/Tasks/api/taskApi.types";
import {tasksAPI} from "features/Tasks/api/taskApi";
import {ResultCode} from "common/enums";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";

export const updateTask = createAppAsyncThunk<UpdateTaskArgType,UpdateTaskArgType>(
    'task/updateTask',
    async (arg, thunkAPI) => {
        const {rejectWithValue, getState} = thunkAPI
        const state = getState()
        const task = state.tasks[arg.todoId].find(t => t.id === arg.taskId)
        if (!task) {
            return rejectWithValue(null)
        }
        const apiModel: UpdateTaskModelType = {...task, ...arg.model}
        const response = await tasksAPI.updateTask(arg.todoId, arg.taskId, apiModel)
        if (response.data.resultCode === ResultCode.SUCCESS) {
            return arg
        } else {
            return rejectWithValue(response.data)
        }
    }
)
