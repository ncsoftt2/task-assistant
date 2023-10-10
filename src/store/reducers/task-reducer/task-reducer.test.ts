import {TaskStateType} from "../../../types/tasks-types";
import {taskReducer} from "./task-reducer";
import {addNewTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTaskAC} from "./task-actions";
import {addNewTodoAC, removeTodoAC, setTodoListAC} from "../todos-reducer/todo-actions";
import {todoReducer} from "../todos-reducer/todo-reducer";
import {TodoListReducerType} from "../../../types/todolists-types";
import {TaskStatus, TodoTaskPriority} from "../../../api/tasks-api";

let startState: TaskStateType
let title: string

beforeEach(() => {
    startState = {
        '1': [
            {
                id: '1', title: 'Typescript',
                todoListId: '', startDate: '', order: 0, addedDate: '', description: "",
                deadline: "", priority: TodoTaskPriority.Low, status: TaskStatus.New
            },
            {
                id: '2', title: 'React',
                todoListId: '', startDate: '', order: 0, addedDate: '', description: "",
                deadline: "", priority: TodoTaskPriority.Low, status: TaskStatus.New
            },
        ],
        '2': [
            {
                id: '1', title: 'Redux',
                todoListId: '', startDate: '', order: 0, addedDate: '', description: "",
                deadline: "", priority: TodoTaskPriority.Low, status: TaskStatus.New
            },
            {
                id: '2', title: 'Javascript',
                todoListId: '', startDate: '', order: 0, addedDate: '', description: "",
                deadline: "", priority: TodoTaskPriority.Low, status: TaskStatus.New

            },
        ],
    }
    title = 'new task title'
})

describe('task-reducer', () => {
    test('correct task should be removed', () => {
        const endState = taskReducer(startState, removeTaskAC('1', '1'))
        expect(endState['1'].length).toBe(1)
        expect(endState['2'].length).toBe(2)
    })
    test('correct task should be added', () => {
        const endState = taskReducer(startState, addNewTaskAC('1', title))
        expect(endState['1'].length).toBe(3)
        expect(endState['1'][2].title).toBe(title)
    })
    test('correct task title should be changed', () => {
        const endState = taskReducer(startState, changeTaskTitleAC('1', '1', title))
        expect(endState['1'][0].title).toBe(title)
    })
    test('correct task status should be changed', () => {
        const endState = taskReducer(startState, changeTaskStatusAC('1', '1', TaskStatus.New))
        expect(endState['1'][0].status).toBe(TaskStatus.New)
    })
    test('add new todo', () => {
        const endState = taskReducer(startState, addNewTodoAC(title))
        const keys = Object.keys(endState)
        const newKey = keys.find(k => k !== '1' && k !== '2')
        if (!newKey) throw Error('error')
        expect(endState[newKey]).toEqual([])
        expect(keys.length).toBe(3)
    })
    test('remove todo', () => {
        const endState = taskReducer(startState, removeTodoAC('1'))
        const keys = Object.keys(endState)
        expect(keys.length).toBe(1)
        expect(endState['1']).toBeUndefined()
    })
    test('added new todo should be same key like task', () => {
        const startStateTask: TaskStateType = {}
        const startStateTodo: TodoListReducerType[] = []
        const action = addNewTodoAC(title)
        const endTaskState = taskReducer(startStateTask, action)
        const endTodoState = todoReducer(startStateTodo, action)
        const taskKeys = Object.keys(endTaskState)
        const keyOfTask = taskKeys[0]
        const keyOfTodo = endTodoState[0].id
        expect(keyOfTask).toBe(action.todoId)
        expect(keyOfTodo).toBe(action.todoId)
    })

    test('empty array of task should be added when we set todolist',() => {
        const startTodoListState:TodoListReducerType[] = [
            {id:"1",title:"what to learn",filter:'all',addedDate:'',order:0},
            {id:"2",title:"what to buy",filter:'all',addedDate:'',order:0},
            {id:"3",title:"what to eat",filter:'all',addedDate:'',order:0}
        ]
        const endState = taskReducer({},setTodoListAC(startTodoListState))
        const keys = Object.keys(endState)
        expect(keys.length).toBe(3)
        expect(endState['1']).toEqual([])
        expect(endState['2']).toEqual([])
        expect(endState['3']).toEqual([])
    })

    test('set tasks for todolist',() => {
        const action = setTaskAC('1',startState['1'])
        const endState = taskReducer({
            ['1']:[],
            ['2']:[]
        },action)
        expect(endState['1'].length).toBe(2)
        expect(endState['2'].length).toBe(0)
    })
})