import {TodoListReducerType} from "../service/slice/todo-list-reducer";
import {FC, memo} from "react";
import {Box, Button, ButtonGroup,Typography, CircularProgress, IconButton, List} from "@mui/material";
import {AddItemForm} from "components/AddItemForm/AddItemForm";
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from "../../Tasks";
import { useTodoList } from "..";
import BoltIcon from '@mui/icons-material/Bolt';
import FiberNewIcon from '@mui/icons-material/FiberNew';

type PropsType = {
    todoList: TodoListReducerType
    demo?: boolean
}

export const TodoList:FC<PropsType> = memo(({demo,todoList: {title,filter,id,entityStatus}}) => {
    const disabled = entityStatus === 'loading'
    const {
        handleDeleteTodoList,
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
                    <Box sx={{gap:'5px',display:'flex',justifyContent:'center',margin:'0 auto',textAlign:'center'}}>
                        {filteredTasks.length > 1 &&
                            <Button onClick={() => handleChangePriority(1)} sx={{padding:0,minWidth:'20px'}}>
                                {priority === 1
                                    ? <BoltIcon/>
                                    : <FiberNewIcon/>
                                }
                            </Button>
                        }
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

            )}
        </>
    )
})
