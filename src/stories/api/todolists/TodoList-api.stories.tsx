import {useEffect, useState} from "react";
import {todoListAPI} from "../../../api/todolist-api";

export default {
    title: "todolists api"
}

export const GetTodoList = () => {
    const [state,setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.getTodoLists()
            .then(res => setState(res))
    },[])
    console.log(state)
    return (
        <div>{JSON.stringify(state)}</div>
    )
}

export const CreateTodoList = () => {
    const [state,setState] = useState<any>(null)
    const [title,setTitle] = useState('')
    useEffect(() => {
        todoListAPI.createTodoList('new title 2')
            .then(res => setState(res))
    },[])
    console.log(state)
    return (
        <div>{JSON.stringify(state)}</div>
    )
}

export const DeleteTodoList = () => {
    const [state,setState] = useState<any>(null)
    const [title,setTitle] = useState('')
    const todoID = '6191a200-cca6-45b5-9868-8eaf68bf1ef5'
    useEffect(() => {
        todoListAPI.deleteTodoList(todoID)
            .then(res => setState(res))
    },[])
    console.log(state)
    return (
        <div>{JSON.stringify(state)}</div>
    )
}

export const UpdateTodoList = () => {
    const [state,setState] = useState<any>(null)
    const [title,setTitle] = useState('')
    const todoID = '6191a200-cca6-45b5-9868-8eaf68bf1ef5'
    useEffect(() => {
        todoListAPI.updateTodoList(todoID,'bla bla bla bla!!!')
            .then(res => setState(res))
    },[])
    console.log(state)
    return (
        <div>{JSON.stringify(state)}</div>
    )
}