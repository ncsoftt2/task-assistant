import {AppState} from "../index";
import {TodoListReducerType} from "../reducers/todo-list/slice/todo-list-reducer";

export const todoListSelectors = (state:AppState):TodoListReducerType[] => state.todoList