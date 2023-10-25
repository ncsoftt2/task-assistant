import {taskReducer, TasksType} from "./task-reducer";
import {updateTaskAC, createTaskAC, deleteTaskAC} from "./task-actions";
import {deleteTodoAC, setTodoListAC} from "../todo-list/todo-list-actions";
import {TaskPriority, TaskStatus, TaskType} from "../../../api/task-api";
import {TodoListType} from "../../../api/todo-list-api";

let startState: TasksType;
let title: string;
let startTodoListState:TodoListType[]
let newTaskState:TaskType

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
                deadline: new Date(), priority: TaskPriority.Low,taskStatus:'idle'
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
        const endState = taskReducer(startState, createTaskAC(newTaskState))
        expect(endState['1'].length).toBe(3)
        expect(endState['1'][0].title).toBe(title)
    })
    test('remove task', () => {
        const endState = taskReducer(startState, deleteTaskAC('1', '2'))
        expect(endState['1'].length).toBe(1)
    })
    test('change task title', () => {
        const endState = taskReducer(startState, updateTaskAC('1', '1', newTaskState))
        expect(endState['1'][0].title).toBe(title)
    })
    test('change task status', () => {
        const endState = taskReducer(startState, updateTaskAC('1', '1', newTaskState))
        expect(endState['1'][0].status).toBe(TaskStatus.Completed)
    })
    test('remove todo = remove task', () => {
        const endState = taskReducer(startState, deleteTodoAC('1'))
        const keys = Object.keys(endState)
        expect(keys.length).toBe(1)
        expect(endState['1']).toBeUndefined()
    })
    test('when added todolist we should added task with empty array',() => {
        const action = setTodoListAC(startTodoListState)
        const endState = taskReducer({
            ['1']: [],
            ['2']:[]
        },action)
        expect(endState['1']).toEqual([])
        expect(endState['2']).toEqual([])
    })
})