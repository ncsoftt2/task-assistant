import { taskSlice } from "../..";
import {todoSlice, TodoListReducerType} from "features/TodoLists/service/slice/todoSlice";
import {createTodoTC} from "../../../TodoLists/service/thunk/createTodo";
import { TasksType } from "features/Tasks/service/slice/taskSlice";

let newTodoListType:TodoListReducerType = {
    id:"1",title:'bla',order:0,addedDate:new Date(),filter:"all",entityStatus:'idle'
}

test('', () => {
    const startTaskState:TasksType = {}
    const startTodoState:TodoListReducerType[] = []
    const action = createTodoTC.fulfilled(newTodoListType,'reqId','title')
    const endTaskState = taskSlice(startTaskState,action)
    const endTodoState = todoSlice(startTodoState,action)
    const keysFromTask = Object.keys(endTaskState)
    const keyOfTask = keysFromTask[0]
    const keyOfTodo = endTodoState[0].id
    expect(keyOfTask).toBe(action.payload.id)
    expect(keyOfTodo).toBe(action.payload.id)
})