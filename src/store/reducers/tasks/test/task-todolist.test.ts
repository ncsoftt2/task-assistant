import {taskReducer, TasksType} from "../slice/task-reducer";
import {todoListReducer, TodoListReducerType} from "../../todo-list/slice/todo-list-reducer";
import {createTodoTC} from "../../todo-list/thunk/createTodo";

let newTodoListType:TodoListReducerType = {
    id:"1",title:'bla',order:0,addedDate:new Date(),filter:"all",entityStatus:'idle'
}

test('', () => {
    const startTaskState:TasksType = {}
    const startTodoState:TodoListReducerType[] = []
    const action = createTodoTC.fulfilled(newTodoListType,'reqId','title')
    const endTaskState = taskReducer(startTaskState,action)
    const endTodoState = todoListReducer(startTodoState,action)
    const keysFromTask = Object.keys(endTaskState)
    const keyOfTask = keysFromTask[0]
    const keyOfTodo = endTodoState[0].id
    expect(keyOfTask).toBe(action.payload.id)
    expect(keyOfTodo).toBe(action.payload.id)
})