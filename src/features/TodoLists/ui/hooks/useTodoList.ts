import {useCallback, useEffect, useState} from "react";
import {TaskPriority, TaskStatus} from "common/enums";
import {useActions, useAppSelector} from "app/model/store";
import {taskActions} from "../../../Tasks";
import {todoListActions} from "../../index";
import {TaskDomainType} from "features/Tasks/model/slice/taskSlice";
import { TodoFilterType } from "features/TodoLists/model/slice/todoSlice";

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
    const {fetchTasksTC,sortTasksAC} = useActions(taskActions)
    const {deleteTodoTC,changeTodoFilterAC} = useActions(todoListActions)
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