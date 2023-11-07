import {Container, Grid, Paper } from "@mui/material"
import { AddItemForm } from "../AddItemForm/AddItemForm"
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {memo, useCallback, useEffect} from "react";
import { TodoList } from "../TodoList/TodoList";
import * as React from "react";
import {Navigate} from "react-router-dom";
import { routes } from "../../routes/routes";
import { fetchTodoTC } from "../../store/reducers/todo-list/thunk/fetchTodoList";
import { createTodoTC } from "../../store/reducers/todo-list/thunk/createTodo";


type PropsType = {
    demo?: boolean
}

export const Main:React.FC<PropsType> = memo(({demo = false}) => {
    const {isAuth} = useAppSelector(({auth}) => auth)
    useEffect(() => {
        if(demo) return
        dispatch(fetchTodoTC())
    }, [])
    const todoList = useAppSelector(state => state.todoList)
    const dispatch = useAppDispatch()
    const addNewTodo = useCallback((title:string) => dispatch(createTodoTC(title)),[dispatch])
    const elements = todoList.map(todo => {
        return (
            <Grid item sx={{p:1}} md={6} lg={3} sm={6} xs={12} key={todo.id}>
                <Paper elevation={5} sx={{p: 1,margin:"0 auto"}}>
                    <TodoList
                        key={todo.id}
                        todoList={todo}
                        demo={demo}
                    />
                </Paper>
            </Grid>
        )
    })
    if(!isAuth) return <Navigate to={routes.login}/>
    return (
        <>
            <Grid container sx={{p: '15px', justifyContent: 'center', alignItems: 'center'}}>
                <AddItemForm callback={addNewTodo}
                />
            </Grid>
            <Container>
                <Grid container>
                    {elements}
                </Grid>
            </Container>
        </>
    )
})