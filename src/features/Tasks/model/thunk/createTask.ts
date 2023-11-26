import {handleServerError} from "common/utils";
import {CreateTaskResponse, TaskType} from "features/Tasks/api/taskApi.types";
import { tasksAPI } from "features/Tasks/api/taskApi";
import {ResultCode} from "common/enums";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";
import {appActions} from "app/app.reducer";
import {thunkTryCatch} from "common/utils/thunkTryCatch";

export const createTask = createAppAsyncThunk<
    TaskType,
    {id:string,payload: CreateTaskResponse}>(
    'task/createTask',
    async ({id,payload},thunkAPI) => {
        const {dispatch,rejectWithValue} = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            const response = await tasksAPI.createTask(id,payload)
            if(response.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatusAC({status:'succeeded'}))
                return response.data.data.item
            } else {
                handleServerError(response.data,dispatch,false)
                return rejectWithValue(response.data)
            }
        })
    }
)

// export const createTaskTC = createAppAsyncThunk<
//     TaskType,
//     {id:string,payload: CreateTaskResponse},
//     {rejectValue: {errors: string[], fieldsErrors?: [FieldsErrorsType]} | null}
// >(
//     'task/createTask',
//     async ({id,payload},{dispatch,rejectWithValue}) => {
//         dispatch(appActions.setAppStatusAC({status:"loading"}))
//         try {
//             const response = await tasksAPI.createTask(id,payload)
//             if(response.data.resultCode === ResultCode.SUCCESS) {
//                 dispatch(appActions.setAppStatusAC({status:'succeeded'}))
//                 return response.data.data.item
//             } else {
//                 handleServerError(response.data,dispatch,false)
//                 return rejectWithValue({errors: response.data.messages,fieldsErrors: response.data.fieldsErrors})
//             }
//         } catch (e) {
//             const err = e as {message: string}
//             handleNetworkError(err,dispatch)
//             return rejectWithValue(null)
//         }
//     }
// )
