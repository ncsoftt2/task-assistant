import {Container, Grid, Paper } from "@mui/material"
import { AddItemForm } from "../../../components/AddItemForm/AddItemForm"
import {memo, useCallback, useEffect} from "react";
import * as React from "react";
import {Navigate} from "react-router-dom";
import { routes } from "../../../routes/routes";
import {useActions, useAppSelector} from "../../../app/store";
import {authSelector} from "../../Login";
import {TodoList, todoListActions, todoSelectors} from "../index";

type PropsType = {
    demo?: boolean
}

export const TodoLists:React.FC<PropsType> = memo(({demo = false}) => {
    const isAuth = useAppSelector(authSelector.isAuthSelector)
    const todoList = useAppSelector(todoSelectors.todoListSelector)
    const {fetchTodoTC,createTodoTC} = useActions(todoListActions)
    const addNewTodo = useCallback((title:string) => createTodoTC(title),[])
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
    useEffect(() => {
        if(!demo) fetchTodoTC()
    }, [])
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