import {Box, Container, Grid, Paper} from "@mui/material"
import {useCallback, useEffect, useState} from "react";
import * as React from "react";
import {useActions, useAppDispatch, useAppSelector} from "app/model/store";
import {todoListActions, todoListSelectors} from "features/TodoLists/index";
import { TodoList } from "./TodoList";
import { AddItemForm, SkeletonTodoLists } from "common/components";

type PropsType = {
    demo?: boolean
}

const TodoLists:React.FC<PropsType> = ({demo = false}) => {
    const [loading, setLoading] = useState(false)
    const todoList = useAppSelector(todoListSelectors.fetchTodoSelector)
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
            dispatch(todoListActions.fetchTodoTC())
                .finally(() => setLoading(false))
        }
    }, [])
    return (
        <>
            <Container maxWidth="lg" disableGutters>
                <Box sx={{display:'flex',justifyContent:'center',margin:'15px 0 30px'}}>
                    <AddItemForm maxLengthTitle={20} callback={addNewTodo} />
                </Box>
                <Grid container sx={{margin:'10px 0'}}>
                    {
                        loading
                            ? <SkeletonTodoLists/>
                            : elements
                    }
                </Grid>
            </Container>
        </>
    )
}
export default TodoLists
