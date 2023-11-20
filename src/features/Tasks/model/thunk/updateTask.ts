import {setAppStatusAC} from "app/model/slice/app-reducer";
import {UpdateTaskModelType} from "features/Tasks/api/taskApi.types";
import {tasksAPI} from "features/Tasks/api/taskApi";
import {handleNetworkError, handleServerError} from "common/utils";
import {ResultCode} from "common/enums";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";
import { tasksActionsCreators } from "../slice/taskSlice";

type ReturnValuesType = { todoId: string, taskId: string, model: UpdateTaskModelType };
export const updateTaskTC = createAppAsyncThunk<
    ReturnValuesType | void,
    {todoId:string,taskId:string,model: Partial<UpdateTaskModelType>}
>(
    'task/updateTask',
    async ({taskId,todoId,model},{getState,dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:'loading'}))
        dispatch(tasksActionsCreators.changeTaskStatusAC({todoId,taskId,taskStatus:'loading'}))
        try {
            const state = getState()
            const task = state.tasks[todoId].find(t => t.id === taskId)
            if (task) {
                const apiModel:UpdateTaskModelType = {...task, ...model}
                const response = await tasksAPI.updateTask(todoId,taskId,apiModel)
                if(response.data.resultCode === ResultCode.SUCCESS) {
                    dispatch(setAppStatusAC({status:'succeeded'}))
                    dispatch(tasksActionsCreators.changeTaskStatusAC({todoId,taskId,taskStatus:'succeeded'}))
                    return {taskId,todoId, model:response.data.data.item}
                } else {
                    handleServerError(response.data,dispatch)
                    dispatch(tasksActionsCreators.changeTaskStatusAC({todoId,taskId,taskStatus:'failed'}))
                    return rejectWithValue(null)
                }
            }
        } catch (e) {
            const err = e as {message:string}
            handleNetworkError(err,dispatch)
            dispatch(tasksActionsCreators.changeTaskStatusAC({todoId,taskId,taskStatus:'failed'}))
            return rejectWithValue(null)
        }
    }
)
