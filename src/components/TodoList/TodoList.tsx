import {TodoListReducerType} from "../../store/reducers/todo-list/slice/todo-list-reducer";
import {FC, memo} from "react";
import {TaskPriority} from "../../api/task-api";
import {Task} from "../Task/Task";
import {Box, Button, ButtonGroup, CircularProgress, FormControl, IconButton, InputLabel, List, MenuItem, Select} from "@mui/material";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import {useTodoList} from "./hooks/useTodoList";

type PropsType = {
    todoList: TodoListReducerType
    demo?: boolean
}

export const TodoList:FC<PropsType> = memo(({demo,todoList: {title,filter,id,entityStatus}}) => {
    const disabled = entityStatus === 'loading'
    const {handleDeleteTodoList,
        handleChangeFilter,
        handleChangePriority,
        handleAddTask,
        tasks,
        filteredTasks,
        priority
    } = useTodoList(id,filter,demo = false)
    const tasksRender = filteredTasks.map(task => {
        return <Task key={task.id}
                     todoId={id}
                     task={task}
                     demo={demo}
        />
    })
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