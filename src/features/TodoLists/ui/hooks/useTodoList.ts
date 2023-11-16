import {useCallback, useEffect, useState} from "react";
import {TaskPriority, TaskStatus} from "api/task-api";
import {TaskDomainType} from "../../../Tasks/service/slice/task-reducer";
import {TodoFilterType} from "../../service/slice/todo-list-reducer";
import {useActions, useAppSelector} from "app/store";
import {taskActions} from "../../../Tasks";
import {todoListActions} from "../../index";

export const useTodoList = (id: string,filter:TodoFilterType,demo: boolean,addedDate: Date) => {
    const tasks = useAppSelector(state => state.tasks[id])
    const date = new Date(addedDate)
    const todoDate = date.getDate().toString().padStart(2, '0')
    const todoMonth = (date.getMonth() + 1).toString().padStart(2, '0')
    const todoYear = date.getFullYear()
    const todoAddedDate = `${todoDate}.${todoMonth}.${todoYear}`
    const todoTitleStyle = {
        display:'flex',
        justifyContent:'center',
        maxWidth:'200px',
        fontWeight: 400,
        margin:'0px auto 10px',
        wordBreak:'break-all',
    }
    const [priority,setPriority] = useState<TaskPriority>(TaskPriority.Low)
    const {createTaskTC,fetchTasksTC,sortTasksAC} = useActions(taskActions)
    const {deleteTodoTC,changeTodoFilterAC} = useActions(todoListActions)
    const handleAddTask = useCallback((title:string) => createTaskTC({id, title}),[id])
    const handleDeleteTodoList = () => deleteTodoTC(id)
    const handleChangeFilter = useCallback((filter:TodoFilterType) => changeTodoFilterAC({todoId:id,filter:filter}),[])
    const handleChangePriority = (e: 1 | 5) => {
        setPriority(prevState => prevState === 1 ? 5 : 1)
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
        priority,
        todoTitleStyle,
        todoAddedDate
    }
}