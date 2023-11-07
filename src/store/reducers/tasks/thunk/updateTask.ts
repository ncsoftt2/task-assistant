import {tasksAPI, UpdateTaskModelType} from "../../../../api/task-api";
import {AppState} from "../../../index";
import {setAppStatusAC} from "../../app/slice/app-reducer";
import {handleNetworkError, handleServerError} from "../../../../utils/handleError";
import {changeTaskStatusAC} from "../slice/task-reducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {FieldsErrorsType} from "../../../../api/api-types";

type ReturnValuesType = { todoId: string, taskId: string, model: UpdateTaskModelType };
export const updateTaskTC = createAsyncThunk<
    ReturnValuesType | void,
    {todoId:string,taskId:string,model: Partial<UpdateTaskModelType>},
    { rejectValue: { errors: string[],fieldsErrors?: [FieldsErrorsType] } }
>(
    'task/updateTask',
    async ({taskId,todoId,model},{getState,dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:'loading'}))
        dispatch(changeTaskStatusAC({todoId,taskId,taskStatus:'loading'}))
        try {
            const state = getState() as AppState
            const task = state.tasks[todoId].find(t => t.id === taskId)
            if (task) {
                const apiModel:UpdateTaskModelType = {...task, ...model}
                const response = await tasksAPI.updateTask(todoId,taskId,apiModel)
                if(response.data.resultCode === 0) {
                    dispatch(setAppStatusAC({status:'succeeded'}))
                    dispatch(changeTaskStatusAC({todoId,taskId,taskStatus:'succeeded'}))
                    return {taskId,todoId, model:response.data.data.item}
                } else {
                    handleServerError(response.data,dispatch)
                    return rejectWithValue({errors: response.data.messages,fieldsErrors: response.data.fieldsErrors})
                }
            }
        } catch (e) {
            const err = e as {message:string}
            handleNetworkError(err,dispatch)
            return rejectWithValue({errors:[err.message]})
        } finally {
            dispatch(setAppStatusAC({status:'idle'}))
            setTimeout(() =>{
                dispatch(changeTaskStatusAC({todoId,taskId,taskStatus:'idle'}))
            },3000)
        }
    }
)
