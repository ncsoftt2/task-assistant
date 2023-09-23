import React, {useCallback, useState} from "react";
import { Header } from "../header/header"
import {AppDrawer} from "../drawer/drawer";
import {Container, Grid, Paper} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { TodoList } from "../todo-list/todo-list";
import {addNewTodoAC} from "../../store/reducers/todos-reducer/todo-actions";
import {AddItemForm} from "../AddItemForm/AddItemForm";

export const Main = () => {
    const [drawerOpen,setDrawerOpen] = useState(false)
    const {taskReducer:{tasks},todoReducer:{todoList}} = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const addNewTodo = useCallback((title:string) => dispatch(addNewTodoAC(title)),[dispatch])
    const todoListRender = todoList.map(todo => {
        return (
            <Grid item sx={{p:1}} xs={3} key={todo.id}>
                <Paper elevation={5} sx={{p: 1,margin:"0 auto"}}>
                    <TodoList
                        key={todo.id}
                        todoId={todo.id}
                        title={todo.title}
                        tasks={tasks[todo.id]}
                        filter={todo.filter}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <>
            <Header setDrawerOpen={setDrawerOpen}/>
            <AppDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
            <Grid container sx={{p: '15px', justifyContent: 'center', alignItems: 'center'}}>
                <AddItemForm callback={addNewTodo}
                             maxLengthValue={10}
                />
            </Grid>
            <Container>
                <Grid container>
                    {todoListRender}
                </Grid>
            </Container>
        </>
    )
}