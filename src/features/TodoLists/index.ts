import * as todoListSelectors from './model/selectors/todoSelectors'
import {todoActionsCreators, todoThunks} from "features/TodoLists/model/slice/todoSlice";
import {todoReducer} from './model/slice/todoSlice'

const todoListActions = {...todoActionsCreators,...todoThunks}

export {
    todoReducer,
    todoListSelectors,
    todoListActions
}