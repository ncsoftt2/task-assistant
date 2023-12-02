import {FC, memo, useState} from "react";
import {Box, Button, ButtonGroup, CircularProgress, List} from "@mui/material";
import { Task } from "../../Tasks";
import BoltIcon from '@mui/icons-material/Bolt';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import ClearIcon from '@mui/icons-material/Clear';
import {CreateTaskForm} from "features/Tasks/ui/CreateTask";
import { TodoListReducerType } from "../model/slice/todoSlice";
import { useTodoList } from "./hooks/useTodoList";
import {UniversalButton, UniversalModal } from "common/components";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";

type PropsType = {
    todoList: TodoListReducerType
    demo?: boolean
}

export const TodoList:FC<PropsType> = memo(({todoList: {title,filter,id,entityStatus,addedDate}}) => {
    const disabled = entityStatus === 'loading'
    const {
        handleDeleteTodoList,
        handleChangeFilter,
        handleChangePriority,
        tasks,
        filteredTasks,
        priority,
        todoTitleStyle,
        todoAddedDate,
        handleUpdateTodoListTitle
    } = useTodoList(id,filter,addedDate)
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
                    }}}
                        onClick={handleDeleteTodoList}
                        disabled={disabled}
                >
                    <ClearIcon/>
                </Button>
            </Box>
            <Box sx={todoTitleStyle}>
                <EditableSpan value={title} onChange={handleUpdateTodoListTitle} />
            </Box>
            <Box sx={{mt:"25px"}} onClick={() => setOpenCreateTask(true)}>
                <Button sx={{p:0}} disabled={disabled}>Create new task</Button>
            </Box>
            <Box>created: {todoAddedDate}</Box>
            {
                !disabled
                    ? <List sx={{gap: 2}}>{tasksRender}</List>
                    : tasks.length
                        ? (
                            <Box sx={{margin:'10px 0',display:'flex',justifyContent:'center'}}>
                                <CircularProgress color="primary" />
                            </Box>
                        )
                        : null
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

