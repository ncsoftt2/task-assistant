import {Container, Grid, Paper } from "@mui/material"
import { AddItemForm } from "../AddItemForm/AddItemForm"
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {memo, useCallback, useEffect} from "react";
import {createTodoThunk, getTodoThunk} from "../../store/reducers/todo-list/todo-list-actions";
import { TodoList } from "../TodoList/TodoList";
import * as React from "react";


type PropsType = {
    demo?: boolean
}

export const Main:React.FC<PropsType> = memo(({demo = false}) => {
    useEffect(() => {
        if(demo) return
        dispatch(getTodoThunk())
    }, [])
    const todoList = useAppSelector(state => state.todoList)
    const dispatch = useAppDispatch()
    const addNewTodo = useCallback((title:string) => dispatch(createTodoThunk(title)),[dispatch])
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