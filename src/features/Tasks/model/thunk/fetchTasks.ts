import {tasksAPI} from "features/Tasks/api/taskApi";
import {TaskType} from "features/Tasks/api/taskApi.types";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";
import {appActions} from "app/app.reducer";
import {thunkTryCatch} from "common/utils/thunkTryCatch";

export const fetchTasks = createAppAsyncThunk<{ tasks:TaskType[], id:string },string>(
    'task/fetchTasks',
    async (id,thunkAPI) => {
        const {dispatch} = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            const response = await tasksAPI.getTasks(id)
            dispatch(appActions.setAppStatusAC({status:"succeeded"}))
            return {tasks:response.data.items,id}
        })
    }
)

// export const fetchTasksTC = createAppAsyncThunk<{ tasks:TaskType[], id:string },string>(
//     'task/fetchTasks',
//     async (id,{dispatch,rejectWithValue}) => {
//         dispatch(appActions.setAppStatusAC({status:'loading'}))
//         try {
//             const response = await tasksAPI.getTasks(id)
//             dispatch(appActions.setAppStatusAC({status:"succeeded"}))
//             return {tasks:response.data.items,id}
//         } catch (e) {
//             const err = e as {message: string}
//             handleNetworkError(err,dispatch)
//             return rejectWithValue(null)
//         }
//     }
// )
