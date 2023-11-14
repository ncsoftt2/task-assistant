import {Container, Grid, Paper} from "@mui/material"
import { AddItemForm } from "components/AddItemForm/AddItemForm"
import {memo, useCallback, useEffect, useState} from "react";
import * as React from "react";
import {useActions, useAppDispatch, useAppSelector} from "app/store";
import {TodoList, todoListActions, todoSelectors} from "../index";
import { fetchTodoTC } from "../service/thunk/fetchTodoList";
import {SkeletonTodoLists} from "components/SkeletonTodoLists";

type PropsType = {
    demo?: boolean
}

const TodoLists:React.FC<PropsType> = memo(({demo = false}) => {
    const [loading, setLoading] = useState(false)
    const todoList = useAppSelector(todoSelectors.todoListSelector)
    const {createTodoTC} = useActions(todoListActions)
    const dispatch = useAppDispatch()
    const addNewTodo = useCallback((title:string) => createTodoTC(title),[])
    const elements = todoList.map(todo => {
        return (
            <Grid item sx={{p:1}} md={6} lg={4} sm={6} xs={12} key={todo.id}>
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
        if(!demo) {
            setLoading(true)
            dispatch(fetchTodoTC())
                .finally(() => setLoading(false))
        }
    }, [])
    return (
        <>
            <Grid container sx={{p: '15px', justifyContent: 'center', alignItems: 'center'}}>
                <AddItemForm callback={addNewTodo}
                />
            </Grid>
            <Container>
                <Grid container>
                    {
                        loading
                            ? <SkeletonTodoLists/>
                            : elements
                    }
                </Grid>
            </Container>
        </>
    )
})
export default TodoLists
