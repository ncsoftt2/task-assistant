import React, {useCallback, useState} from "react";
import { Header } from "../header/header"
import {AppDrawer} from "../drawer/drawer";
import {Container, Grid, Paper} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { TodoList } from "../todo-list/todo-list";
import {addNewTodoAC} from "../../store/reducers/todos-reducer/todo-actions";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {todoListSelector} from "../../store/selectors/selectors";
import {useWindowSize} from "../useWindowSize/useWindowSize";

export const Main = () => {
    const [drawerOpen,setDrawerOpen] = useState(false)
    const todoList = useAppSelector(todoListSelector)
    const dispatch = useAppDispatch()
    const addNewTodo = useCallback((title:string) => dispatch(addNewTodoAC(title)),[dispatch])
    const size = useWindowSize()
    const todoListRender = todoList.map(todo => {
        return (
            size > 1000 ? (
                <Grid item sx={{p:1}} xs={3} key={todo.id}>
                    <Paper elevation={5} sx={{p: 1,margin:"0 auto"}}>
                        <TodoList
                            key={todo.id}
                            todoList={todo}
                        />
                    </Paper>
                </Grid>
            )
                : <Grid item sx={{p:1}} xs={12} key={todo.id}>
                    <Paper elevation={5} sx={{p: 1,margin:"0 auto"}}>
                        <TodoList
                            key={todo.id}
                            todoList={todo}
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