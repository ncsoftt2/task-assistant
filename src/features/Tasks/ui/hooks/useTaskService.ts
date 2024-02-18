import {TaskStatus} from "common/enums";
import React, {ChangeEvent, useCallback} from "react";
import {useActions} from "common/hooks/useActions";
import {taskActions} from "features/Tasks/index";
import {TaskDomainType} from "features/Tasks/model/slice/taskSlice";
import {getData} from "common/utils/getData";

export const useTaskService = (todoId:string,task:TaskDomainType,setOpenEditTask?: (value: boolean) => void) => {
    const {updateTask,deleteTask} = useActions(taskActions)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const taskDeadline = getData(task.deadline)

    const open = Boolean(anchorEl)
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    },[])
    const handleDeleteTask = useCallback(() => {
        deleteTask({todoId, taskId: task.id})
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
        updateTask({todoId,taskId:task.id,model: {status}})
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



