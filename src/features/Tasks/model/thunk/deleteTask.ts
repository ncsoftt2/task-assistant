import {handleServerError} from "common/utils"
import {DeleteTaskArgType, tasksAPI} from "features/Tasks/api/taskApi";
import {ResultCode} from "common/enums";
import {appActions} from "app/app.reducer";
import {thunkTryCatch} from "common/utils/thunkTryCatch";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";

export const deleteTask = createAppAsyncThunk<DeleteTaskArgType,DeleteTaskArgType>(
    'task/deleteTask',
    async (arg,thunkAPI) => {
        const {dispatch,rejectWithValue} = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            const response = await tasksAPI.deleteTask(arg)
            if(response.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatusAC({status:'succeeded'}))
                return arg
            } else {
                handleServerError(response.data,dispatch)
                return rejectWithValue(null)
            }
        })
    }
)
// export const deleteTaskTC = createAsyncThunk<PayloadType,PayloadType,{
//     rejectValue: {errors: string[]}
// }>(
//     'task/deleteTask',
//     async ({todoId,taskId},{dispatch,rejectWithValue}) => {
//         dispatch(appActions.setAppStatusAC({status:"loading"}))
//         try {
//             const response = await tasksAPI.deleteTask(todoId,taskId)
//             if(response.data.resultCode === ResultCode.SUCCESS) {
//                 dispatch(appActions.setAppStatusAC({status:'succeeded'}))
//                 return {taskId,todoId}
//             } else {
//                 handleServerError(response.data,dispatch)
//                 return rejectWithValue({errors: response.data.messages})
//             }
//         } catch (e) {
//             const err = e as {message: string}
//             handleNetworkError(err,dispatch)
//             return rejectWithValue({errors:[err.message]})
//         }
//     }
// )
