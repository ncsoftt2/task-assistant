import {TaskStatus} from "common/enums";
import React, {ChangeEvent, useCallback} from "react";
import {useActions} from "app/model/store";
import {taskActions} from "features/Tasks/index";
import {TaskDomainType} from "features/Tasks/model/slice/taskSlice";

export const useTaskService = (todoId:string,task:TaskDomainType,setOpenEditTask?: (value: boolean) => void) => {
    const {updateTaskTC,deleteTaskTC} = useActions(taskActions)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const date = new Date(task.deadline)
    const taskDeadlineDate = date.getDate().toString().padStart(2, '0')
    const taskDeadlineMonth = (date.getMonth() + 1).toString().padStart(2, '0')
    const taskDeadlineYear = date.getFullYear()
    const taskDeadline = `${taskDeadlineDate}.${taskDeadlineMonth}.${taskDeadlineYear}`

    const open = Boolean(anchorEl)
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    },[])
    const handleDeleteTask = useCallback(() => {
        deleteTaskTC({todoId, taskId: task.id})
        setAnchorEl(null)
    },[todoId,task.id])
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleOpenEditModalTask = useCallback(() => {
        setOpenEditTask && setOpenEditTask(true)
        setAnchorEl(null)
    },[])
    const handleChangeTaskStatus = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        const checkedValue = e.currentTarget.checked
        const status = checkedValue ? TaskStatus.Completed : TaskStatus.New
        updateTaskTC({todoId,taskId:task.id,model: {status}})
    },[todoId,task.id])
    return {
        handleClose,
        open,
        handleClick,
        handleOpenEditModalTask,
        anchorEl,
        handleChangeTaskStatus,
        handleDeleteTask,
        taskDeadline
    }
}



