import {FC, memo, useState} from "react";
import {Box, Button, CircularProgress, List} from "@mui/material";
import {Task} from "../../Tasks";
import BoltIcon from '@mui/icons-material/Bolt';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import ClearIcon from '@mui/icons-material/Clear';
import {CreateTaskForm} from "features/Tasks/ui/CreateTask";
import {TodoListReducerType} from "../model/slice/todoSlice";
import {useTodoList} from "./hooks/useTodoList";
import {UniversalModal} from "common/components";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import {AnimatePresence, motion} from "framer-motion";
import {TodoListFilterButtons} from "./TodoListFilterButtons/TodoListFilterButtons";

type PropsType = {
    todoList: TodoListReducerType
}

export const TodoList: FC<PropsType> = memo(({todoList: {title, filter, id, entityStatus, addedDate}}) => {
    const disabled = entityStatus === 'loading'
    const {
        handleDeleteTodoList,
        handleChangeFilter,
        handleChangePriority,
        tasks,
        filteredTasks,
        priority,
        todoTitleStyle,
        handleUpdateTodoListTitle,
        todoAddedDate
    } = useTodoList(id, filter, addedDate)
    const [openCreateTask, setOpenCreateTask] = useState(false)
    const tasksRender = filteredTasks.map(task => {
        return (
            <motion.div
                layout
                key={task.id}
                initial={{x: -50, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                exit={{x: -10, opacity: 0}}
            >
                <Task todoId={id}
                      task={task}
                />
            </motion.div>
        )
    })
    return (
        <>
            <Box sx={{textAlign: 'right'}}>
                {
                    openCreateTask && (
                        <UniversalModal open={openCreateTask} setOpen={setOpenCreateTask}>
                            <CreateTaskForm id={id}/>
                        </UniversalModal>
                    )
                }
                <Button sx={{
                    padding: 0, minWidth: '40px', '&:hover': {
                        transform: 'rotate(90deg)',
                        transition: 'transform 0.5s ease',
                    }
                }}
                        onClick={handleDeleteTodoList}
                        disabled={disabled}
                >
                    <ClearIcon/>
                </Button>
            </Box>
            <Box sx={todoTitleStyle}>
                <EditableSpan value={title} onChange={handleUpdateTodoListTitle}/>
            </Box>
            <Box sx={{mt: "25px", display: 'inline-block'}} onClick={() => setOpenCreateTask(true)}>
                <Button sx={{p: 0}} disabled={disabled}>Создать новую задачу</Button>
            </Box>
            <Box>создано: {todoAddedDate}</Box>
            {
                !disabled
                    ? (
                        <List sx={{gap: 2}}>
                            <AnimatePresence>
                                {tasksRender}
                            </AnimatePresence>
                        </List>
                    )
                    : tasks.length
                        ? (
                            <Box sx={{margin: '10px 0', display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress color="primary"/>
                            </Box>
                        )
                        : null
            }
            {tasks.length > 0 && (
                <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    {filteredTasks.length > 1 &&
                        <Button onClick={() => handleChangePriority(1)} sx={{padding: 0, minWidth: '20px'}}>
                            {priority === 1
                                ? <BoltIcon/>
                                : <FiberNewIcon/>
                            }
                        </Button>
                    }
                    <TodoListFilterButtons disabled={disabled}
                                           handleChangeFilter={handleChangeFilter}
                                           filter={filter}
                    />
                </Box>

            )}
        </>
    )
})

