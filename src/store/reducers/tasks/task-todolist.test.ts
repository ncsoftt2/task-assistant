import {taskReducer, TasksType} from "./task-reducer";
import {todoListReducer, TodoListReducerType} from "../todo-list/todo-list-reducer";
import {createNewTodoAC} from "../todo-list/todo-list-actions";

let newTodoListType:TodoListReducerType = {
    id:"1",title:'bla',order:0,addedDate:new Date(),filter:"all",entityStatus:'idle'
}

test('', () => {
    const startTaskState:TasksType = {}
    const startTodoState:TodoListReducerType[] = []
    const action = createNewTodoAC(newTodoListType)
    const endTaskState = taskReducer(startTaskState,action)
    const endTodoState = todoListReducer(startTodoState,action)
    const keysFromTask = Object.keys(endTaskState)
    const keyOfTask = keysFromTask[0]
    const keyOfTodo = endTodoState[0].id
    expect(keyOfTask).toBe(action.todoList.id)
    expect(keyOfTodo).toBe(action.todoList.id)
})