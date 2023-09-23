import {combineReducers, compose, legacy_createStore} from "redux";
import {todoReducer} from "./reducers/todos-reducer/todo-reducer";
import {taskReducer} from "./reducers/task-reducer/task-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const reducers = combineReducers({
    todoReducer,
    taskReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = legacy_createStore(
    reducers,
    composeEnhancers()
)

export type AppState = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch