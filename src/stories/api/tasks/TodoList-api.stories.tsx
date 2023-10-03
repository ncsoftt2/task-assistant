import {useEffect, useState} from "react";
import axios from "axios";
import {todoListAPI} from "../../../api/todolist-api";
import {tasksAPI} from "../../../api/tasks-api";

export default {
    title: "tasks api"
}

export const GetTasks = () => {
    const [state,setState] = useState<any>(null)
    const todoListId = '2268f018-e891-4842-8700-2b050b74c924'
    useEffect(() => {
        tasksAPI.getTasks(todoListId)
            .then(res => setState(res))
    },[])
    return (
        <div>{JSON.stringify(state)}</div>
    )
}

export const CreateTask = () => {
    const [state,setState] = useState<any>(null)
    const [title,setTitle] = useState('')

    const addTask = () => {
        tasksAPI.createTask(todoListId,'aaaaaaaaaaaaaaaaaawwww')
            .then(res => setState(res))
    }
    const todoListId = '2268f018-e891-4842-8700-2b050b74c924'
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <button onClick={addTask}>add task</button>
        </div>
    )
}

export const DeleteTask = () => {
    const [state,setState] = useState<any>(null)
    const [title,setTitle] = useState('')
    const todoID = '2268f018-e891-4842-8700-2b050b74c924'
    const taskID = '08a85770-9e13-408f-b0dc-ca025ac038ec'
    const removeTask = () => {
        tasksAPI.deleteTask(todoID,taskID)
            .then(res => setState(res))
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <button onClick={removeTask}>delete</button>
        </div>
    )
}

export const UpdateTask = () => {
    const [state,setState] = useState<any>(null)
    const todoID = '2268f018-e891-4842-8700-2b050b74c924'
    const taskID = '08a85770-9e13-408f-b0dc-ca025ac038ec'
    const title = 'new task title 2023'
    useEffect(() => {
        tasksAPI.updateTask(todoID,taskID,title)
            .then(res => setState(res))
    },[])
    console.log(state)
    return (
        <div>{JSON.stringify(state)}</div>
    )
}