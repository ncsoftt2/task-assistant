import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useCallback, useEffect, useState} from "react";
import {TaskPriority, TaskStatus} from "../../../api/task-api";
import {sortTasksAC, TaskDomainType} from "../../../store/reducers/tasks/slice/task-reducer";
import {changeTodoFilterAC, TodoFilterType} from "../../../store/reducers/todo-list/slice/todo-list-reducer";
import {SelectChangeEvent} from "@mui/material/Select";
import {fetchTasksTC} from "../../../store/reducers/tasks/thunk/fetchTasks";
import {createTaskTC} from "../../../store/reducers/tasks/thunk/createTask";
import {deleteTodoTC} from "../../../store/reducers/todo-list/thunk/deleteTodo";

export const useTodoList = (id: string,filter:TodoFilterType,demo: boolean) => {
    useEffect(() => {
        if(demo) return
        dispatch(fetchTasksTC(id))
    },[])
    const tasks = useAppSelector(state => state.tasks[id])
    const [priority,setPriority] = useState<TaskPriority>(TaskPriority.Low)
    const dispatch = useAppDispatch()
    const handleAddTask = useCallback((title:string) => dispatch(createTaskTC({id, title})),[id])
    const handleDeleteTodoList = () => dispatch(deleteTodoTC(id))
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
    return {
        handleAddTask,
        handleDeleteTodoList,
        handleChangeFilter,
        handleChangePriority,
        filteredTasks,
        tasks,
        priority
    }
}