import {ChangeEvent, useState} from "react";
import {TaskPriority, TaskStatus} from "common/enums";
import { tasksAPI } from "features/Tasks/api/taskApi";
import { CreateTaskResponse, UpdateTaskModelType } from "features/Tasks/api/taskApi.types";
import {TodoListType} from "features/TodoLists/api/todoApi.types";

export default {
    title: 'API/Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<TodoListType[]>([])
    const [todoId, setTodoId] = useState<string>('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)
    const handleClick = () => {
        tasksAPI.getTasks(todoId)
            .then(res => setState(res.data.items))
    }
    return (
        <div>
            <input placeholder={'todo id'} value={todoId} onChange={handleChange}/>
            <button onClick={handleClick}>get</button>
            {state.map(el => {
                return (
                    <div style={{display: 'flex'}}>
                        <div style={{marginRight: '20px'}}>todoId: {el.id}</div>
                        <div>title: {el.title}</div>
                    </div>
                )
            })
            }
        </div>
    )
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [title,setTitle] = useState<string>('')
    const handleChangeTodoId = (e: ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)
    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const payload:CreateTaskResponse = {title,deadline:new Date(),priority:TaskPriority.Low,description:'task desc'}
    const handleClick = () => {
        tasksAPI.createTask(todoId,payload)
            .then(res => setState(res.data.data.item))
    }
    return (
        <div>
            <input placeholder={'todo id'} value={todoId} onChange={handleChangeTodoId}/>
            <input placeholder={'task title'} value={title} onChange={handleChangeTitle}/>
            <button onClick={handleClick}>create</button>
        </div>
    )
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId,setTodoId] = useState<string>('')
    const [taskId,setTaskId] = useState<string>('')
    const handleChangeTodoId = (e:ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)
    const handleChangeTaskId = (e:ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)
    const handleClick = () => {
        tasksAPI.deleteTask(todoId,taskId)
            .then(res => setState(res.data))
    }
    return (
        <div>
            <input placeholder={'todo id'} value={todoId} onChange={handleChangeTodoId}/>
            <input placeholder={'task id'} value={taskId} onChange={handleChangeTaskId}/>
            <button onClick={handleClick}>delete</button>
        </div>
    )
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId,setTodoId] = useState<string>('')
    const [taskId,setTaskId] = useState<string>('')
    const [title,setTitle] = useState<string>('')
    const [description,setDescription] = useState<string>('')
    const [status,setStatus] = useState<TaskStatus>(TaskStatus.New)
    const [priority,setPriority] = useState<TaskPriority>(TaskPriority.Low)
    const [startDate,setStartDate] = useState<Date>(new Date())
    const [deadline,setDeadline] = useState<Date>(new Date())
    const handleChangeTodoId = (e:ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)
    const handleChangeTaskId = (e:ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)
    const handleChangeTaskTitle = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const handleClick = () => {
        const model:UpdateTaskModelType = {description,title,status,priority,startDate,deadline}
        tasksAPI.updateTask(todoId,taskId,model)
            .then(res => setState(res.data))
    }
    return (
        <div>
            <input placeholder={'todo id'} value={todoId} onChange={handleChangeTodoId}/>
            <input placeholder={'task id'} value={taskId} onChange={handleChangeTaskId}/>
            <input placeholder={'task title'} value={title} onChange={handleChangeTaskTitle}/>
            <button onClick={handleClick}>update</button>
        </div>
    )
}