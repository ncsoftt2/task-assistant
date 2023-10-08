import {Provider} from "react-redux";
import {AppState, reducers} from "../store";
import {ThemeProvider} from "@mui/material";
import {theme} from "../styles/GlobalTheme";
import {legacy_createStore} from "redux";
import React from "react";
import {TaskStatus, TodoTaskPriority} from "../api/tasks-api";

const initialState:AppState = {
    todoList: [
        {id: '1', addedDate: '', order: 0, title: 'What to learn',filter: "all"},
        {id: '2', addedDate: '', order: 0, title: 'What to buy',filter: "active"},
        {id: '3', addedDate: '', order: 0, title: 'What to eat',filter: "completed"},
    ],
    tasks: {
        ['1']: [
            {description: '', title: 'new title', status: TaskStatus.New, priority: TodoTaskPriority.Low,
                startDate: '', deadline: '', id: '1', todoListId: '1', order: 0, addedDate: '',
            },
            {description: '', title: 'new title', status: TaskStatus.New, priority: TodoTaskPriority.Low,
                startDate: '', deadline: '', id: '2', todoListId: '1', order: 0, addedDate: '',
            },
        ],
        ['2']: [
            {description: '', title: 'new title', status: TaskStatus.New, priority: TodoTaskPriority.Low,
                startDate: '', deadline: '', id: '1', todoListId: '2', order: 0, addedDate: '',
            },
            {description: '', title: 'new title', status: TaskStatus.New, priority: TodoTaskPriority.Low,
                startDate: '', deadline: '', id: '2', todoListId: '2', order: 0, addedDate: '',
            },
        ],
        ['3']: [
            {description: '', title: 'new title', status: TaskStatus.New, priority: TodoTaskPriority.Low,
                startDate: '', deadline: '', id: '3', todoListId: '3', order: 0, addedDate: '',
            },
            {description: '', title: 'new title', status: TaskStatus.New, priority: TodoTaskPriority.Low,
                startDate: '', deadline: '', id: '3', todoListId: '3', order: 0, addedDate: '',
            },
        ],
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