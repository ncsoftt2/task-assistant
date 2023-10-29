import {createTaskAC, deleteTaskAC, setTaskAC, taskReducer, TasksType, updateTaskAC} from "./task-reducer";
import {TaskPriority, TaskStatus, TaskType} from "../../../api/task-api";
import {TodoListType} from "../../../api/todo-list-api";
import {clearDataAC, deleteTodoAC, setTodoListAC} from "../todo-list/todo-list-reducer";

let startState: TasksType;
let title: string;
let startTodoListState:TodoListType[]
let newTaskState:TaskType
let startStateTaskTypeAPI:TaskType[] = [
    {
        id: '1', title: "React", todoListId: "1", status: TaskStatus.New, order: 0,
        startDate: new Date(), description: '', addedDate:new Date(), deadline:new Date(),
        priority: TaskPriority.Low
    },
    {
        id: '2', title: "React", todoListId: "1", status: TaskStatus.New, order: 0,
        startDate: new Date(), description: '', addedDate: new Date(),
        deadline: new Date(), priority: TaskPriority.Urgently
    },
]

beforeEach(() => {
    startState = {
        '1': [
            {
                id: '1', title: "React", todoListId: "1", status: TaskStatus.New, order: 0,
                startDate: new Date(), description: '', addedDate:new Date(), deadline:new Date(),
                priority: TaskPriority.Low,taskStatus:'idle'
            },
            {
                id: '2', title: "React", todoListId: "1", status: TaskStatus.New, order: 0,
                startDate: new Date(), description: '', addedDate: new Date(),
                deadline: new Date(), priority: TaskPriority.Urgently,taskStatus:'idle'
            },
        ],
        '2': [
            {
                id: '1', title: "React", todoListId: "2", status: TaskStatus.New, order: 0,
                startDate: new Date(), description: '', addedDate: new Date(), deadline:new Date(),
                priority: TaskPriority.Low,taskStatus:'idle'
            },
            {
                id: '2', title: "React", todoListId: "2", status: TaskStatus.New, order: 0,
                startDate: new Date(), description: '', addedDate: new Date(),
                deadline:new Date(), priority: TaskPriority.Low,taskStatus:'idle'
            },
        ],
    }
    title = 'new todo title'
    startTodoListState = [{
        id:'1',order:0,addedDate:new Date(),title:title
    }]
    newTaskState = {id:'1',title:title,status:TaskStatus.Completed,order:0,todoListId:'1',addedDate:new Date(),
    deadline:new Date(),description:'',priority:TaskPriority.Low,startDate:new Date()}
})

describe('todo-lists', () => {
    test('add task', () => {
        const endState = taskReducer(startState, createTaskAC({task:newTaskState}))
        expect(endState['1'].length).toBe(3)
        expect(endState['1'][0].title).toBe(title)
    })
    test('remove task', () => {
        const endState = taskReducer(startState, deleteTaskAC({todoId:"1",taskId:'2'}))
        expect(endState['1'].length).toBe(1)
    })
    test('change task title', () => {
        const endState = taskReducer(startState, updateTaskAC({taskId:'1', todoId:'1', model:newTaskState}))
        expect(endState['1'][0].title).toBe(title)
    })
    test('change task status', () => {
        const endState = taskReducer(startState, updateTaskAC({todoId:'1', taskId:'1', model:newTaskState}))
        expect(endState['1'][0].status).toBe(TaskStatus.Completed)
    })
    test('remove todo = remove task', () => {
        const endState = taskReducer(startState, deleteTodoAC({todoId:'1'}))
        const keys = Object.keys(endState)
        expect(keys.length).toBe(1)
        expect(endState['1']).toBeUndefined()
    })
    test('when added todolist we should added task with empty array',() => {
        const action = setTodoListAC({todoList:startTodoListState})
        const endState = taskReducer({
            ['1']: [],
            ['2']:[]
        },action)
        expect(endState['1']).toEqual([])
        expect(endState['2']).toEqual([])
    })
    test('when user logout, state should be cleared',() => {
        const endState = taskReducer(startState,clearDataAC())
        expect(endState).toEqual({})
    })
    test('set tasks for todolist',() => {
        const action = setTaskAC({todoListId:"1",tasks:startStateTaskTypeAPI})
        const endState = taskReducer({['1']: [], ['2']: [],}, action)
        expect(endState['1'].length).toBe(2)
        expect(endState['2'].length).toBe(0)
    })
})