import {tasksAPI} from "features/Tasks/api/taskApi";
import {TaskType} from "features/Tasks/api/taskApi.types";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";

export const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], id: string }, string>(
    'task/fetchTasks',
    async (id) => {
        const response = await tasksAPI.getTasks(id)
        return {tasks: response.data.items, id}
    }
)
