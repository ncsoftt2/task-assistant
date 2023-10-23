import {Provider} from "react-redux";
import {AppState, reducers} from "../store";
import {ThemeProvider} from "@mui/material";
import {theme} from "../styles/GlobalTheme";
import {legacy_createStore} from "redux";
import React from "react";
import {TaskPriority, TaskStatus} from "../api/task-api";

const initialState:AppState = {
    todoList: [
        {id: '1', addedDate: new Date(), order: 0, title: 'What to learn',filter: "all",entityStatus:'idle'},
        {id: '2', addedDate: new Date(), order: 0, title: 'What to buy',filter: "active",entityStatus:'idle'},
        {id: '3', addedDate: new Date(), order: 0, title: 'What to eat',filter: "completed",entityStatus:'idle'},
    ],
    tasks: {
        ['1']: [
            {description: '', title: 'new title', status: TaskStatus.New, priority: TaskPriority.Low,
                startDate: new Date(), deadline: new Date(), id: '1', todoListId: '1', order: 0, addedDate: new Date(),
            },
            {description: '', title: 'new title', status: TaskStatus.New, priority: TaskPriority.Low,
                startDate: new Date(), deadline: new Date(), id: '2', todoListId: '1', order: 0, addedDate: new Date(),
            },
        ],
        ['2']: [
            {description: '', title: 'new title', status: TaskStatus.New, priority: TaskPriority.Low,
                startDate: new Date(), deadline: new Date(), id: '1', todoListId: '2', order: 0, addedDate: new Date(),
            },
            {description: '', title: 'new title', status: TaskStatus.New, priority: TaskPriority.Low,
                startDate: new Date(), deadline: new Date(), id: '2', todoListId: '2', order: 0, addedDate: new Date(),
            },
        ],
        ['3']: [
            {description: '', title: 'new title', status: TaskStatus.New, priority: TaskPriority.Low,
                startDate: new Date(), deadline: new Date(), id: '3', todoListId: '3', order: 0, addedDate: new Date(),
            },
            {description: '', title: 'new title', status: TaskStatus.New, priority: TaskPriority.Low,
                startDate: new Date(), deadline: new Date(), id: '3', todoListId: '3', order: 0, addedDate: new Date(),
            },
        ],
    },
    app: {
        status:'idle',
        error: null
    }
}

export const storyBookStore = legacy_createStore(reducers, initialState)

export const MainStoreDecorators = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            <ThemeProvider theme={theme}>
                {storyFn()}
            </ThemeProvider>
        </Provider>
    )
}