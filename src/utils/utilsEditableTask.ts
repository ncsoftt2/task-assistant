import {RequestStatusType} from "../store/reducers/app/slice/app-reducer";
import {useAppDispatch} from "../store/hooks";
import {ChangeEvent, useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {TaskPriority, TaskStatus} from "../api/task-api";
import {TaskDomainType} from "../store/reducers/tasks/slice/task-reducer";
import {updateTaskTC} from "../store/reducers/tasks/thunk/updateTask";

export const useUtilsEditableTask = (taskUpdateStatus:RequestStatusType,task:TaskDomainType,todoId:string) => {
    const updateStatus = task.taskStatus
    const [title,setTitle] = useState(task.title)
    const [description,setDescription] = useState(task.description)
    const [status,setStatus] = useState(task.status)
    const [priority,setPriority] = useState(task.priority)
    const handleChangeDescription = (e:ChangeEvent<HTMLInputElement>) => {
        setDescription(e.currentTarget.value)
    }
    const handleChangeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const handleChangeStatus = (e: SelectChangeEvent<TaskStatus>) => {
        setStatus(+e.target.value)
    }
    const handleChangePriority = (e: SelectChangeEvent<TaskPriority>) => {
        setPriority(+e.target.value)
    }
    const dispatch = useAppDispatch()
    const updateTask = () => {
        const payload =  {title,description,status,priority}
        dispatch(updateTaskTC({todoId, taskId:task.id, model:payload}))

    }
    const styleTask = {
        color:'white',
        padding:'10px',
        borderRadius:'20px',
        backgroundColor:`${taskUpdateStatus === 'succeeded' ? "green" : "red"}`,
        textAlign:'center',
        margin:'10px 0'
    }
    return {
        styleTask,
        updateStatus,
        handleChangeDescription,
        handleChangeTitle,
        handleChangeStatus,
        handleChangePriority,
        updateTask,
        title,
        status,
        priority,
        description
    }
}