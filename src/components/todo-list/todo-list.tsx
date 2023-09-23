import {TaskType} from "../../types/tasks-types";
import React, {FC, useCallback} from "react";
import {Button, ButtonGroup, List} from "@mui/material";
import {Task} from "../task/Task";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {useAppDispatch} from "../../store/hooks";
import {addNewTaskAC} from "../../store/reducers/task-reducer/task-actions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTodoFilterAC, removeTodoAC} from "../../store/reducers/todos-reducer/todo-actions";
import {FilterType} from "../../types/todos-types";

type PropsType = {
    todoId:string
    tasks: TaskType[]
    title:string
    filter:FilterType
}

export const TodoList:FC<PropsType> = React.memo(({todoId,tasks,title,filter}) => {
    console.log("todo list", todoId)
    const dispatch = useAppDispatch()
    const handleDeleteTodoList = () => dispatch(removeTodoAC(todoId))
    const handleAddNewTask = useCallback((newTitle:string) => dispatch(addNewTaskAC(todoId,newTitle)),[todoId])
    const handleChangeFilter = (filter:FilterType) => () => dispatch(changeTodoFilterAC(todoId,filter))
    const filterTask = (task:TaskType[],filter:FilterType) => {
        switch (filter){
            case "active":
                return task.filter(({isDone}) => !isDone)
            case "completed":
                return task.filter(({isDone}) => isDone)
            default: return task
        }
    }
    const filteredTasks = filterTask(tasks,filter)
    const tasksRender = filteredTasks.map(task => {
        return <Task
            key={task.id}
            todoId={todoId}
            tasks={task}
        />
    })
    return (
        <>
            <Typography variant={'h2'}
                        fontSize={20}
                        gutterBottom
                        align={'center'}
                        sx={{display:'flex',alignItems:'center',fontWeight: "bold",
                            cursor:'pointer',color:'silver',
                            justifyContent:'center'
            }}
            >
                {title}
                <IconButton onClick={handleDeleteTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </Typography>
            <AddItemForm callback={handleAddNewTask} maxLengthValue={10}/>
            <List sx={{gap:2}}>
                {tasksRender}
            </List>
            {tasks.length > 0 && (
                <ButtonGroup variant="contained" sx={{width:"100%"}}>
                    <Button
                    variant={filter === 'all' ? 'contained' : "outlined"}
                        onClick={handleChangeFilter('all')}
                        color={filter === 'all' ? 'secondary' : "primary"}
                    >All</Button>
                    <Button
                    variant={filter === 'active' ? 'contained' : "outlined"}
                        onClick={handleChangeFilter('active')}
                        color={filter === 'active' ? 'secondary' : "primary"}
                    >Active</Button>
                    <Button
                        variant={filter === 'completed' ? 'contained' : "outlined"}
                        onClick={handleChangeFilter('completed')}
                        color={filter === 'completed' ? 'secondary' : "primary"}
                    >Completed</Button>
                </ButtonGroup>
            )}
        </>
    )
})