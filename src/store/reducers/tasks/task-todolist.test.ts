import {taskReducer, TasksType} from "./task-reducer";
import {createNewTodoAC, todoListReducer, TodoListReducerType} from "../todo-list/todo-list-reducer";

let newTodoListType:TodoListReducerType = {
    id:"1",title:'bla',order:0,addedDate:new Date(),filter:"all",entityStatus:'idle'
}

test('', () => {
    const startTaskState:TasksType = {}
    const startTodoState:TodoListReducerType[] = []
    const action = createNewTodoAC({todoList:newTodoListType})
    const endTaskState = taskReducer(startTaskState,action)
    const endTodoState = todoListReducer(startTodoState,action)
    const keysFromTask = Object.keys(endTaskState)
    const keyOfTask = keysFromTask[0]
    const keyOfTodo = endTodoState[0].id
    expect(keyOfTask).toBe(action.payload.todoList.id)
    expect(keyOfTodo).toBe(action.payload.todoList.id)
})