import {AppState} from "../index";
import {TodoListReducerType} from "../../types/todolists-types";

export const todoListSelector = (state:AppState):TodoListReducerType[] => state.todoList