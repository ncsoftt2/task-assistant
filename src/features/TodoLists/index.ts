import * as todoSelectors from './service/selectors/todoSelectors'
import {todoListReducer, todoSlice} from "./service/slice/todo-list-reducer";
import { createTodoTC } from './service/thunk/createTodo';
import { deleteTodoTC } from './service/thunk/deleteTodo';
import { fetchTodoTC } from './service/thunk/fetchTodoList';
import { updateTodoTitleTC } from './service/thunk/updateTodoTitle';
import { TodoList } from "./ui/TodoList";
import { TodoLists } from "./ui/TodoLists";
import { useTodoList } from "./ui/hooks/useTodoList";

const todoListActions = {createTodoTC,deleteTodoTC,fetchTodoTC,updateTodoTitleTC,...todoSlice.actions}

export {
    todoListReducer,
    TodoList,
    TodoLists,
    useTodoList,
    todoSelectors,
    todoListActions
}