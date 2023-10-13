import {Box, Checkbox, ListItem} from "@mui/material";
import React, {ChangeEvent, FC, useCallback} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
    deleteTaskAC,
    deleteTaskThunk,
    updateTaskAC,
    updateTaskThunk
} from "../../store/reducers/task-reducer/task-actions";
import {useAppDispatch} from "../../store/hooks";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {useWindowSize} from "../useWindowSize/useWindowSize";
import {TaskStatus, TaskType} from "../../api/tasks-api";


type PropsType = {
    task: TaskType
    todoId: string
}

export const Task: FC<PropsType> = React.memo(({task, todoId}) => {
    const dispatch = useAppDispatch()
    const handleRemoveTask = () => dispatch(deleteTaskThunk(todoId, task.id))
    const handleChangeStatus = (e:ChangeEvent<HTMLInputElement>) => {
        const changeStatus = e.currentTarget.checked
        const status = changeStatus ? TaskStatus.Completed : TaskStatus.New
        dispatch(updateTaskThunk(todoId, task.id, {status}))
    }
    const handleChangeTaskTitle = useCallback((title: string) => {
        dispatch(updateTaskThunk(todoId, task.id, {title}))
    }, [todoId, task.id])
    const size = useWindowSize()
    return (
        size > 1000
            ? <ListItem sx={{m: '10px 0', p: 0, gap: 2, display: 'flex', justifyContent: 'space-between'}}>
                <Box>
                    <Checkbox
                        sx={{p: 0}}
                        color={'success'}
                        size={'small'}
                        checked={task.status === TaskStatus.Completed}
                        onChange={handleChangeStatus}
                    />
                    <EditableSpan title={task.title} updateItem={handleChangeTaskTitle}/>
                </Box>
                <IconButton sx={{padding: 0}} onClick={handleRemoveTask}>
                    <DeleteOutlineIcon color='error'/>
                </IconButton>
            </ListItem>
            : <ListItem sx={{m: '10px 0', p: 0, gap: 2, display: 'flex', justifyContent: 'space-between'}}>
                <Box>
                    <Checkbox
                        sx={{p: 0}}
                        color={'success'}
                        size={'small'}
                        checked={task.status === TaskStatus.Completed}
                        onChange={handleChangeStatus}
                    />
                    <EditableSpan title={task.title} updateItem={handleChangeTaskTitle}/>
                </Box>
                <IconButton sx={{padding: 0}} onClick={handleRemoveTask}>
                    <DeleteOutlineIcon color='error' fontSize={'small'}/>
                </IconButton>
            </ListItem>
    )
})