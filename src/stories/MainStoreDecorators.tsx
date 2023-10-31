import {Provider} from "react-redux";
import {AppState, reducers} from "../store";
import {ThemeProvider} from "@mui/material";
import {theme} from "../styles/GlobalTheme";
import React from "react";
import {TaskPriority, TaskStatus} from "../api/task-api";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";

const initialState:AppState = {
    todoList: [
        {id: '1', addedDate: new Date(), order: 0, title: 'What to learn',filter: "all",entityStatus:'idle'},
        {id: '2', addedDate: new Date(), order: 0, title: 'What to buy',filter: "active",entityStatus:'idle'},
        {id: '3', addedDate: new Date(), order: 0, title: 'What to eat',filter: "completed",entityStatus:'idle'},
    ],
    tasks: {
        ['1']: [
            {description: '', title: 'new title', status: TaskStatus.Completed, priority: TaskPriority.Low,
                startDate: new Date(), deadline: new Date(), id: '1', todoListId: '1', order: 0, addedDate: new Date(),
                taskStatus:'idle'
            },
            {description: '', title: 'new title', status: TaskStatus.New, priority: TaskPriority.Urgently,
                startDate: new Date(), deadline: new Date(), id: '2', todoListId: '1', order: 0, addedDate: new Date(),
            taskStatus:'idle'
            },
        ],
        ['2']: [
            {description: '', title: 'new title', status: TaskStatus.New, priority: TaskPriority.Low,
                startDate: new Date(), deadline: new Date(), id: '1', todoListId: '2', order: 0, addedDate: new Date(),
                taskStatus:'idle'
            },
            {description: '', title: 'new title', status: TaskStatus.New, priority: TaskPriority.Low,
                startDate: new Date(), deadline: new Date(), id: '2', todoListId: '2', order: 0, addedDate: new Date(),
                taskStatus:'idle'
            },
        ],
        ['3']: [
            {description: '', title: 'new title', status: TaskStatus.New, priority: TaskPriority.Low,
                startDate: new Date(), deadline: new Date(), id: '3', todoListId: '3', order: 0, addedDate: new Date(),
                taskStatus:'idle'
            },
            {description: '', title: 'new title', status: TaskStatus.New, priority: TaskPriority.Urgently,
                startDate: new Date(), deadline: new Date(), id: '3', todoListId: '3', order: 0, addedDate: new Date(),
                taskStatus:'idle'
            },
        ],
    },
    app: {
        status:'idle',
        error: null,
        initialized:true,
        userData: {
            email:'free@gmail.com',
            id:1,
            login:'free-agent'
        }
    },
    auth: {
        isAuth: true
    }
}

export const storyBookStore = configureStore({
    reducer:reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
    preloadedState: initialState,
    devTools:true
})

export const MainStoreDecorators = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            <ThemeProvider theme={theme}>
                {storyFn()}
            </ThemeProvider>
        </Provider>
    )
}