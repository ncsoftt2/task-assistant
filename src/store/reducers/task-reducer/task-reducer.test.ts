import {TaskStateType} from "../../../types/tasks-types";
import {taskReducer} from "./task-reducer";
import {addNewTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./task-actions";
import {addNewTodoAC, removeTodoAC} from "../todos-reducer/todo-actions";
import {TodoListType} from "../../../types/todos-types";
import {todoReducer} from "../todos-reducer/todo-reducer";

const startState:TaskStateType = {
    tasks: {
        '1': [
            {id:'1',title:'Typescript',isDone:false},
            {id:'2',title:'React',isDone:false},
        ],
        '2': [
            {id:'1',title:'Redux',isDone:false},
            {id:'2',title:'Javascript',isDone:false},
        ],
    }
}
const title = 'new task title'

it('correct task should be removed',()=>{
    const endState = taskReducer(startState,removeTaskAC('1','1'))
    expect(endState.tasks['1'].length).toBe(1)
    expect(endState.tasks['2'].length).toBe(2)
})
it('correct task should be added',() => {
    const endState = taskReducer(startState,addNewTaskAC('1',title))
    expect(endState.tasks['1'].length).toBe(3)
    expect(endState.tasks['1'][2].title).toBe(title)
})
it('correct task title should be changed',() => {
    const endState = taskReducer(startState,changeTaskTitleAC('1','1',title))
    expect(endState.tasks['1'][0].title).toBe(title)
})
it('correct task status should be changed',() => {
    const endState = taskReducer(startState,changeTaskStatusAC('1','1',true))
    expect(endState.tasks['1'][0].isDone).toBe(true)
})
it('add new todo',() => {
    const endState = taskReducer(startState,addNewTodoAC(title))
    const keys = Object.keys(endState.tasks)
    const newKey = keys.find(k => k !== '1' && k !== '2')
    if(!newKey) throw Error('error')
    expect(endState.tasks[newKey]).toEqual([])
    expect(keys.length).toBe(3)
})
it('remove todo',() => {
    const endState = taskReducer(startState,removeTodoAC('1'))
    const keys = Object.keys(endState.tasks)
    expect(keys.length).toBe(1)
    expect(endState.tasks['1']).toBeUndefined()
})
it('added new todo should be same key like task',() => {
    const startStateTask:TaskStateType = {
        tasks: {}
    }
    const startStateTodo:TodoListType = {
        todoList: []
    }
    const action = addNewTodoAC(title)
    const endTaskState = taskReducer(startStateTask,action)
    const endTodoState = todoReducer(startStateTodo,action)
    const taskKeys = Object.keys(endTaskState.tasks)
    const keyOfTask = taskKeys[0]
    const keyOfTodo = endTodoState.todoList[0].id
    expect(keyOfTask).toBe(action.todoId)
    expect(keyOfTodo).toBe(action.todoId)
})