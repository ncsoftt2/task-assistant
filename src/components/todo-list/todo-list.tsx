import React, {FC, useCallback, useEffect} from "react";
import {Box, Button, ButtonGroup, List} from "@mui/material";
import {Task} from "../task/Task";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {addNewTaskAC, getTaskThunk} from "../../store/reducers/task-reducer/task-actions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTodoFilterAC, changeTodoTitleAC, removeTodoAC} from "../../store/reducers/todos-reducer/todo-actions";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {useWindowSize} from "../useWindowSize/useWindowSize";
import {TaskStatus, TaskType} from "../../api/tasks-api";
import {TodoFilterType, TodoListReducerType} from "../../types/todolists-types";

type PropsType = {
    todoList: TodoListReducerType
}

export const TodoList: FC<PropsType> = React.memo(({todoList: {id, title, filter}}) => {

    const tasks = useAppSelector(state => state.tasks[id])
    const dispatch = useAppDispatch()
    const handleDeleteTodoList = () => dispatch(removeTodoAC(id))
    const handleAddNewTask = useCallback((newTitle: string) => dispatch(addNewTaskAC(id, newTitle)), [id])
    const handleChangeFilter = (filter: TodoFilterType) => () => dispatch(changeTodoFilterAC(id, filter))
    const handleChangeTodoListTitle = (newTitle: string) => dispatch(changeTodoTitleAC(id, newTitle))
    const filterTask = (task: TaskType[], filter: TodoFilterType) => {
        switch (filter) {
            case "active":
                return task.filter(({status}) => status === TaskStatus.New)
            case "completed":
                return task.filter(({status}) => status === TaskStatus.Completed)
            default:
                return task
        }
    }
    const filteredTasks = filterTask(tasks, filter)
    const tasksRender = filteredTasks.map(task => {
        return <Task key={task.id}
                     todoId={id}
                     tasks={task}
        />
    })
    const size = useWindowSize()

    useEffect(() => {
        dispatch(getTaskThunk(id))
    }, [tasks.length]);

    return (
        size > 1000
            ? (
                <>
                    <Box sx={{textAlign: 'center', fontSize: '20px'}}>
                        <EditableSpan title={title} updateItem={handleChangeTodoListTitle}/>
                        <IconButton onClick={handleDeleteTodoList}>
                            <DeleteIcon/>
                        </IconButton>
                    </Box>
                    <AddItemForm callback={handleAddNewTask} maxLengthValue={10}/>
                    <List sx={{gap: 2}}>
                        {tasksRender}
                    </List>
                    {tasks.length > 0 && (
                        <ButtonGroup variant="contained" sx={{width: "100%"}}>
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
            : (
                <Box sx={{textAlign:'center'}}>
                    <Box sx={{textAlign: 'center', fontSize: '14px'}}>
                        <EditableSpan title={title} updateItem={handleChangeTodoListTitle}/>
                        <IconButton onClick={handleDeleteTodoList}>
                            <DeleteIcon/>
                        </IconButton>
                    </Box>
                    <AddItemForm callback={handleAddNewTask} maxLengthValue={10}/>
                    <List>
                        {tasksRender}
                    </List>
                    {tasks.length > 0 && (
                        <ButtonGroup variant="contained">
                            <Button
                                size={'small'}
                                sx={{fontSize:'10px'}}
                                variant={filter === 'all' ? 'contained' : "outlined"}
                                onClick={handleChangeFilter('all')}
                                color={filter === 'all' ? 'secondary' : "primary"}
                            >All</Button>
                            <Button
                                size={'small'}
                                sx={{fontSize:'10px'}}
                                variant={filter === 'active' ? 'contained' : "outlined"}
                                onClick={handleChangeFilter('active')}
                                color={filter === 'active' ? 'secondary' : "primary"}
                            >Active</Button>
                            <Button
                                size={'small'}
                                sx={{fontSize:'10px'}}
                                variant={filter === 'completed' ? 'contained' : "outlined"}
                                onClick={handleChangeFilter('completed')}
                                color={filter === 'completed' ? 'secondary' : "primary"}
                            >Completed</Button>
                        </ButtonGroup>
                    )}
                </Box>
            )
    )
})