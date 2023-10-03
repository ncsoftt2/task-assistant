import {AppState} from "../index";
import {TodoListType} from "../../types/todos-types";

export const todoListSelector = (state:AppState):TodoListType[] => state.todoList