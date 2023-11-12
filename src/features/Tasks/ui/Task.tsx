import {TaskStatus} from "api/task-api";
import React, {memo, useCallback} from "react";
import {ChangeEvent, FC} from "react";
import {Box, Checkbox, ListItem} from "@mui/material";
import {EditMenu} from "components/Menu/EditMenu";
import {utilsTask} from "utils/utilsTask";
import {TaskDomainType} from "../service/slice/task-reducer";
import {useActions} from "app/store";
import {taskActions} from "../index";

type PropsType = {
    task: TaskDomainType
    todoId: string
    demo?: boolean
}

export const Task: FC<PropsType> = memo(({todoId, task}) => {
    const {deleteTaskTC,updateTaskTC} = useActions(taskActions)
    const handleDeleteTask = useCallback(() => deleteTaskTC({todoId, taskId:task.id}), [todoId, task.id])
    const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        updateTaskTC({todoId, taskId:task.id, model:{status}})
    }
    const {style,taskAddedDate} = utilsTask(task)
    return (
        <ListItem sx={style}>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <Checkbox
                    sx={{p: 0, mr: '5px', zIndex: 0}}
                    color={'default'}
                    size={'small'}
                    checked={task.status === TaskStatus.Completed}
                    onChange={handleChangeStatus}
                />
                <Box sx={{wordBreak: 'break-all'}}>{task.title}</Box>
            </Box>
            <Box sx={{display:'flex',alignItems:'center'}}>
                <Box>{taskAddedDate}</Box>
                <EditMenu callback={handleDeleteTask} task={task} todoId={todoId}/>
            </Box>
        </ListItem>
    )
})
