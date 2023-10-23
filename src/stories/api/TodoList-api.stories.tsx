import {ChangeEvent, useEffect, useState} from "react"
import {todoListAPI, TodoListType} from "../../api/todo-list-api";

export default {
    title: 'API/Todolist'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<TodoListType[]>([])
    useEffect(() => {
        todoListAPI.getTodoList()
            .then(res => setState(res.data))
    },[])
    return (
        <div>
            {state.map(el => {
                return (
                    <div style={{display:'flex'}}>
                        <div style={{marginRight:'20px'}}>todoId: {el.id}</div>
                        <div>title: {el.title}</div>
                    </div>
                )
            })}
        </div>
    )
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title,setTitle] = useState<string>('')
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const handleClick = () => {
        todoListAPI.createTodoList(title)
            .then(res => setState(res.data))
        setTitle('')
    }
    return (
        <div>
            <input value={title} onChange={handleChange}/>
            <button onClick={handleClick}>add</button>
        </div>
    )
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoId,setTodoId] = useState<string>('')
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)
    const handleClick = () => {
        todoListAPI.deleteTodoList(todoId)
            .then(res => setState(res.data))
    }
    return (
        <div>
            <input placeholder={'todo id'} value={todoId} onChange={handleChange}/>
            <button onClick={handleClick}>x</button>
        </div>
    )
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId,setTodoId] = useState<string>('')
    const [title,setTitle] = useState<string>('')
    const handleChangeTodoId = (e:ChangeEvent<HTMLInputElement>) => setTodoId(e.currentTarget.value)
    const handleChangeTitle = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const handleClick = () => {
        todoListAPI.updateTodoListTitle(todoId,title)
            .then(res => setState(res.data))
    }
    return (
        <div>
            <input placeholder={'todo id'} value={todoId} onChange={handleChangeTodoId}/>
            <input placeholder={'todo title'} value={title} onChange={handleChangeTitle}/>
            <button onClick={handleClick}>update</button>
        </div>
    )
}