import {AppState} from "app/store";
import {setAppStatusAC} from "app/service/slice/app-reducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {UpdateTaskModelType} from "features/Tasks/api/taskApi.types";
import {FieldsErrorsType} from "common/types";
import {tasksAPI} from "features/Tasks/api/taskApi";
import {handleNetworkError, handleServerError} from "common/utils";
import {taskActions} from "features/Tasks/index";
import {ResultCode} from "common/enums";

type ReturnValuesType = { todoId: string, taskId: string, model: UpdateTaskModelType };
export const updateTaskTC = createAsyncThunk<
    ReturnValuesType | void,
    {todoId:string,taskId:string,model: Partial<UpdateTaskModelType>},
    { rejectValue: { errors: string[],fieldsErrors?: [FieldsErrorsType] } }
>(
    'task/updateTask',
    async ({taskId,todoId,model},{getState,dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:'loading'}))
        dispatch(taskActions.changeTaskStatusAC({todoId,taskId,taskStatus:'loading'}))
        try {
            const state = getState() as AppState
            const task = state.tasks[todoId].find(t => t.id === taskId)
            if (task) {
                const apiModel:UpdateTaskModelType = {...task, ...model}
                const response = await tasksAPI.updateTask(todoId,taskId,apiModel)
                if(response.data.resultCode === ResultCode.SUCCESS) {
                    dispatch(setAppStatusAC({status:'succeeded'}))
                    dispatch(taskActions.changeTaskStatusAC({todoId,taskId,taskStatus:'succeeded'}))
                    return {taskId,todoId, model:response.data.data.item}
                } else {
                    handleServerError(response.data,dispatch)
                    dispatch(taskActions.changeTaskStatusAC({todoId,taskId,taskStatus:'failed'}))
                    return rejectWithValue({errors: response.data.messages,fieldsErrors: response.data.fieldsErrors})
                }
            }
        } catch (e) {
            const err = e as {message:string}
            handleNetworkError(err,dispatch)
            dispatch(taskActions.changeTaskStatusAC({todoId,taskId,taskStatus:'failed'}))
            return rejectWithValue({errors:[err.message]})
        }
    }
)
