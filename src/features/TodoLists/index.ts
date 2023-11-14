import * as todoSelectors from './service/selectors/todoSelectors'
import {todoListReducer, slice} from "./service/slice/todo-list-reducer";
import { createTodoTC } from './service/thunk/createTodo';
import { deleteTodoTC } from './service/thunk/deleteTodo';
import { fetchTodoTC } from './service/thunk/fetchTodoList';
import { updateTodoTitleTC } from './service/thunk/updateTodoTitle';
import { TodoList } from "./ui/TodoList";
import { TodoListsAsync as TodoLists } from "./ui/TodoLists.async";
import { useTodoList } from "./ui/hooks/useTodoList";

const todoListActions = {createTodoTC,deleteTodoTC,fetchTodoTC,updateTodoTitleTC,...slice.actions}

export {
    todoListReducer,
    TodoList,
    TodoLists,
    useTodoList,
    todoSelectors,
    todoListActions
}