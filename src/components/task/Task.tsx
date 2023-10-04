import {Box, Checkbox, ListItem} from "@mui/material";
import {TaskType} from "../../types/tasks-types";
import React, {FC, useCallback} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../store/reducers/task-reducer/task-actions";
import {useAppDispatch} from "../../store/hooks";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {useWindowSize} from "../useWindowSize/useWindowSize";


type PropsType = {
    tasks: TaskType
    todoId: string
}

export const Task: FC<PropsType> = React.memo(({tasks: {id, title, isDone}, todoId}) => {
    const dispatch = useAppDispatch()
    const handleRemoveTask = () => dispatch(removeTaskAC(todoId, id))
    const handleChangeStatus = (isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoId, id, isDone))
    }
    const handleChangeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(todoId, id, newTitle))
    }, [todoId, id])
    const size = useWindowSize()
    return (
        size > 1000
            ? <ListItem sx={{m: '10px 0', p: 0, gap: 2, display: 'flex', justifyContent: 'space-between'}}>
                <Box>
                    <Checkbox
                        sx={{p: 0}}
                        color={'success'}
                        size={'small'}
                        checked={isDone}
                        onChange={(e) => handleChangeStatus(e.currentTarget.checked)}
                    />
                    <EditableSpan title={title} updateItem={handleChangeTaskTitle}/>
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
                        checked={isDone}
                        onChange={(e) => handleChangeStatus(e.currentTarget.checked)}
                    />
                    <EditableSpan title={title} updateItem={handleChangeTaskTitle}/>
                </Box>
                <IconButton sx={{padding: 0}} onClick={handleRemoveTask}>
                    <DeleteOutlineIcon color='error' fontSize={'small'}/>
                </IconButton>
            </ListItem>
    )
})