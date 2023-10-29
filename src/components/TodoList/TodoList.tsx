import {changeTodoFilterAC, deleteTodoThunk, TodoFilterType, TodoListReducerType} from "../../store/reducers/todo-list/todo-list-reducer";
import {FC, memo, useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {TaskPriority, TaskStatus} from "../../api/task-api";
import {Task} from "../Task/Task";
import {Box, Button, ButtonGroup, CircularProgress, FormControl, IconButton, InputLabel, List, MenuItem, Select} from "@mui/material";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {SelectChangeEvent} from "@mui/material/Select";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import {createTaskThunk, getTaskThunk, sortTasksAC, TaskDomainType} from "../../store/reducers/tasks/task-reducer";

type PropsType = {
    todoList: TodoListReducerType
    demo?: boolean
}

export const TodoList:FC<PropsType> = memo(({todoList: {title,filter,id,entityStatus}}) => {
    const tasks = useAppSelector(state => state.tasks[id])
    const disabled = entityStatus === 'loading'
    const [priority,setPriority] = useState<TaskPriority>(TaskPriority.Low)
    const dispatch = useAppDispatch()
    const handleAddTask = useCallback((newTitle:string) => dispatch(createTaskThunk(id,newTitle)),[id])
    const handleDeleteTodoList = () => dispatch(deleteTodoThunk(id))
    const handleChangeFilter = (filter:TodoFilterType) => () => dispatch(changeTodoFilterAC({todoId:id,filter:filter}))
    const handleChangePriority = (e: SelectChangeEvent<TaskPriority>) => {
        setPriority(+e.target.value)
        dispatch(sortTasksAC({tasks:tasks, priority:priority, todoId:id}))
    }
    const filterTasks = (tasks:TaskDomainType[],filter:TodoFilterType):TaskDomainType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(({status}) => status !== TaskStatus.Completed)
            case "completed":
                return tasks.filter(({status}) => status === TaskStatus.Completed)
            default: return tasks
        }
    }
    const filteredTasks = filterTasks(tasks,filter)
    const tasksRender = filteredTasks.map(task => {
        return <Task key={task.id}
                     todoId={id}
                     task={task}
        />
    })
    useEffect(() => {
       dispatch(getTaskThunk(id))
    },[])
    return (
        <>
            <Box sx={{textAlign: 'center', fontSize: '16px'}}>
                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Typography variant='h2' sx={{wordBreak: 'break-all',fontSize:'20px'}}>{title}</Typography>
                    <IconButton onClick={handleDeleteTodoList} disabled={disabled}>
                        <DeleteIcon/>
                    </IconButton>
                </Box>
                <AddItemForm callback={handleAddTask} disabled={disabled}/>
            </Box>
            {
                !disabled
                    ? <List sx={{gap: 2}}>{tasksRender}</List>
                    : <Box sx={{margin:'10px 0',display:'flex',justifyContent:'center'}}>
                        <CircularProgress color="primary" />
                    </Box>
            }
            {tasks.length > 0 && (
                <>
                    <Box sx={{margin:'0 auto',textAlign:'center'}}>
                        <ButtonGroup variant="contained" disabled={disabled} sx={{margin:'0 auto',textAlign:'center'}}>
                            <Button
                                size={'medium'}
                                sx={{fontSize:'10px'}}
                                variant={filter === 'all' ? 'contained' : "outlined"}
                                onClick={handleChangeFilter('all')}
                                color={filter === 'all' ? "primary" : "secondary"}
                            >All</Button>
                            <Button
                                size={'medium'}
                                sx={{fontSize:'10px'}}
                                variant={filter === 'active' ? 'contained' : "outlined"}
                                onClick={handleChangeFilter('active')}
                                color={filter === 'active' ? "primary" : "secondary"}
                            >Active</Button>
                            <Button
                                size={'medium'}
                                sx={{fontSize:'10px'}}
                                variant={filter === 'completed' ? 'contained' : "outlined"}
                                onClick={handleChangeFilter('completed')}
                                color={filter === 'completed' ? "primary" : "secondary"}
                            >Completed</Button>
                        </ButtonGroup>
                    </Box>
                    {filteredTasks.length > 1 && <FormControl sx={{mt:'20px'}}>
                        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={priority}
                            label="Age"
                            onChange={handleChangePriority}
                            disabled={disabled}
                        >
                            <MenuItem value={TaskPriority.Low}>Low</MenuItem>
                            <MenuItem value={TaskPriority.Urgently}>Urgently</MenuItem>
                        </Select>
                    </FormControl>}
                </>

            )}
        </>
    )
})