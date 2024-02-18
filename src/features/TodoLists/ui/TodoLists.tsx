import {Box, Container, Grid, Paper} from "@mui/material"
import {useCallback, useEffect, useState} from "react";
import * as React from "react";
import {todoListActions, todoListSelectors} from "features/TodoLists/index";
import {TodoList} from "./TodoList";
import {AddItemForm, SkeletonTodoLists} from "common/components";
import {useAppSelector} from 'common/hooks/useAppSelector';
import {useActions} from "common/hooks/useActions";
import {AnimatePresence, motion} from "framer-motion";

type Props = {
    demo?: boolean
}

const TodoLists: React.FC<Props> = ({demo = false}) => {
    const [loading, setLoading] = useState(false)
    const todoList = useAppSelector(todoListSelectors.fetchTodoSelector)
    const {fetchTodoTC, createTodoTC} = useActions(todoListActions)
    const addNewTodo = useCallback((title: string) => {
        return createTodoTC(title)
            .unwrap()
    }, [])
    const elements = todoList.map(todo => {
        return (
            <Grid item sx={{p: 1}} md={6} lg={4} sm={6} xs={12}>
                <Paper elevation={5} sx={{p: 1, margin: "0 auto"}}>
                    <TodoList
                        todoList={todo}
                        demo={demo}
                    />
                </Paper>
            </Grid>
        )
    })
    useEffect(() => {
        if (!demo) {
            setLoading(true)
            fetchTodoTC()
                .finally(() => setLoading(false))
        }
    }, [])
    return (
        <>
            <Container maxWidth="lg" disableGutters>
                <Box sx={{display: 'flex', justifyContent: 'center', margin: '15px 0 30px'}}>
                    <AddItemForm callback={addNewTodo}/>
                </Box>
                <Grid container sx={{margin: '10px 0'}}>
                    {
                        loading
                            ? <SkeletonTodoLists/>
                            : (
                                <AnimatePresence>{elements}</AnimatePresence>
                            )
                    }
                </Grid>
            </Container>
        </>
    )
}
export default TodoLists
