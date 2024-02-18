import {useCallback, useEffect, useState} from "react";
import {TaskPriority, TaskStatus} from "common/enums";
import {useActions} from "common/hooks/useActions";
import {taskActions} from "../../../Tasks";
import {todoListActions} from "../../index";
import {TaskDomainType} from "features/Tasks/model/slice/taskSlice";
import { TodoFilterType } from "features/TodoLists/model/slice/todoSlice";
import { useAppSelector } from 'common/hooks/useAppSelector';
import {getData} from "common/utils/getData";
export const useTodoList = (id: string,filter:TodoFilterType,addedDate: Date) => {
    const tasks = useAppSelector(state => state.tasks[id])
    const todoTitleStyle = {
        display:'flex',
        justifyContent:'center',
        maxWidth:'200px',
        fontWeight: 400,
        margin:'0px auto',
        wordBreak:'break-all',
    }
    const [priority,setPriority] = useState<TaskPriority>(TaskPriority.Low)
    const {fetchTasks,sortTasksAC} = useActions(taskActions)
    const {deleteTodoTC,changeTodoFilterAC,updateTodoTitleTC} = useActions(todoListActions)
    const handleDeleteTodoList = () => deleteTodoTC(id)
    const handleUpdateTodoListTitle = useCallback((newTitle:string) => {
        return updateTodoTitleTC({title:newTitle,todoId:id}).unwrap()
    },[])
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

    const todoAddedDate = getData(addedDate)

    const filteredTasks = filterTasks(tasks,filter)
    useEffect(() => {
        fetchTasks(id)
    },[])
    return {
        handleDeleteTodoList,
        handleChangeFilter,
        handleChangePriority,
        filteredTasks,
        tasks,
        priority,
        todoTitleStyle,
        handleUpdateTodoListTitle,
        todoAddedDate
    }
}