import {useCallback, useEffect, useState} from "react";
import {TaskPriority, TaskStatus} from "api/task-api";
import {TaskDomainType} from "../../../Tasks/service/slice/task-reducer";
import {TodoFilterType} from "../../service/slice/todo-list-reducer";
import {SelectChangeEvent} from "@mui/material/Select";
import {useActions, useAppSelector} from "app/store";
import {taskActions} from "../../../Tasks";
import {todoListActions} from "../../index";

export const useTodoList = (id: string,filter:TodoFilterType,demo: boolean) => {
    const tasks = useAppSelector(state => state.tasks[id])
    const [priority,setPriority] = useState<TaskPriority>(TaskPriority.Low)
    const {createTaskTC,fetchTasksTC,sortTasksAC} = useActions(taskActions)
    const {deleteTodoTC,changeTodoFilterAC} = useActions(todoListActions)
    const handleAddTask = useCallback((title:string) => createTaskTC({id, title}),[id])
    const handleDeleteTodoList = () => deleteTodoTC(id)
    const handleChangeFilter = (filter:TodoFilterType) => () => changeTodoFilterAC({todoId:id,filter:filter})
    const handleChangePriority = (e: SelectChangeEvent<TaskPriority>) => {
        setPriority(+e.target.value)
        sortTasksAC({tasks:tasks, priority:priority, todoId:id})
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
    useEffect(() => {
        if(!demo) fetchTasksTC(id)
    },[])
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