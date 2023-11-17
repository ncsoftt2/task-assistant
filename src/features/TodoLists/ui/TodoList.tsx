import {TodoListReducerType} from "../service/slice/todo-list-reducer";
import {FC, memo, useState} from "react";
import {Box, Button, ButtonGroup,Typography, CircularProgress, List} from "@mui/material";
import {AddItemForm} from "components/AddItemForm/AddItemForm";
import { Task } from "../../Tasks";
import { useTodoList } from "..";
import BoltIcon from '@mui/icons-material/Bolt';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import ClearIcon from '@mui/icons-material/Clear';
import { UniversalButton } from "components/UniversalButton/UniversalButton";
import {CreateTaskForm} from "features/Tasks/ui/CreateTask";
import { UniversalModal } from "components/UniversalModal/UniversalModal";

type PropsType = {
    todoList: TodoListReducerType
    demo?: boolean
}

export const TodoList:FC<PropsType> = memo(({demo,todoList: {title,filter,id,entityStatus,addedDate}}) => {
    const disabled = entityStatus === 'loading'
    const {
        handleDeleteTodoList,
        handleChangeFilter,
        handleChangePriority,
        tasks,
        filteredTasks,
        priority,
        todoTitleStyle,
        todoAddedDate
    } = useTodoList(id,filter,demo = false,addedDate)
    const [openCreateTask, setOpenCreateTask] = useState(false)
    const tasksRender = filteredTasks.map(task => {
        return <Task key={task.id}
                     todoId={id}
                     task={task}
        />
    })
    return (
        <>
            <Box sx={{textAlign:'right'}}>
                {
                    openCreateTask && (
                        <UniversalModal open={openCreateTask} setOpen={setOpenCreateTask}>
                            <CreateTaskForm id={id}/>
                        </UniversalModal>
                    )
                }
                <Button sx={{padding:0,minWidth:'40px', '&:hover': {
                        transform: 'rotate(90deg)',
                        transition: 'transform 0.5s ease',
                    }}} onClick={handleDeleteTodoList}>
                    <ClearIcon/>
                </Button>
            </Box>
            <Box>
                <Typography variant='h2' fontSize={18} sx={todoTitleStyle}>{title}</Typography>
            </Box>
            <Box sx={{display:'flex',justifyContent:'center'}} onClick={() => setOpenCreateTask(true)}>
                <Button>Create new task</Button>
            </Box>
            <Box>добавлено: {todoAddedDate}</Box>
            {
                !disabled
                    ? <List sx={{gap: 2}}>{tasksRender}</List>
                    : <Box sx={{margin:'10px 0',display:'flex',justifyContent:'center'}}>
                        <CircularProgress color="primary" />
                    </Box>
            }
            {tasks.length > 0 && (
                    <Box sx={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                        {filteredTasks.length > 1 &&
                            <Button onClick={() => handleChangePriority(1)} sx={{padding:0,minWidth:'20px'}}>
                                {priority === 1
                                    ? <BoltIcon/>
                                    : <FiberNewIcon/>
                                }
                            </Button>
                        }
                        <ButtonGroup variant="contained" disabled={disabled} >
                            <UniversalButton callback={() => handleChangeFilter('all')}
                                             name="All"
                                             variant={filter === 'all' ? 'contained' : "outlined"}
                                             color={filter === 'all' ? 'primary' : 'secondary'}/>
                            <UniversalButton callback={() => handleChangeFilter('active')}
                                             name="Active"
                                             variant={filter === 'active' ? 'contained' : "outlined"}
                                             color={filter === 'active' ? 'primary' : 'secondary'}/>
                            <UniversalButton callback={() => handleChangeFilter('completed')}
                                             name="Completed"
                                             variant={filter === 'completed' ? 'contained' : "outlined"}
                                             color={filter === 'completed' ? 'primary' : 'secondary'}/>
                        </ButtonGroup>
                    </Box>

            )}
        </>
    )
})

