import {setAppStatusAC} from "app/model/slice/app-reducer";
import {handleNetworkError} from "common/utils"
import {tasksAPI} from "features/Tasks/api/taskApi";
import {TaskType} from "features/Tasks/api/taskApi.types";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";

export const fetchTasksTC = createAppAsyncThunk<{ tasks:TaskType[], id:string },string>(
    'task/fetchTasks',
    async (id,{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:'loading'}))
        try {
            const response = await tasksAPI.getTasks(id)
            dispatch(setAppStatusAC({status:"succeeded"}))
            return {tasks:response.data.items,id}
        } catch (e) {
            const err = e as {message: string}
            handleNetworkError(err,dispatch)
            return rejectWithValue(null)
        }
    }
)
