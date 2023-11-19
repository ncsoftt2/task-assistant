import {TaskPriority, TaskStatus} from "common/enums";
import {taskActions} from "features/Tasks/index";
import { clearDataAC } from "common/actions/clearData";
import { TodoListType } from "features/TodoLists/api/todoApi.types";
import {todoListActions} from "features/TodoLists";
import { TasksType, taskReducer } from "../slice/taskSlice";
import { TaskType } from "features/Tasks/api/taskApi.types";

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
        const payload = {title,description:'description',priority: TaskPriority.Low,deadline:new Date()}
        const endState = taskReducer(startState, taskActions.createTaskTC.fulfilled(newTaskState,'reqId', {id:'1',payload}))
        expect(endState['1'].length).toBe(3)
        expect(endState['1'][0].title).toBe(title)
    })
    test('remove task', () => {
        let payload = {todoId:"1",taskId:'2'};
        const endState = taskReducer(startState, taskActions.deleteTaskTC.fulfilled(payload,'reqId',payload))
        expect(endState['1'].length).toBe(1)
    })
    test('change task title', () => {
        let payload = {taskId:'1', todoId:'1', model:newTaskState};
        const endState = taskReducer(startState, taskActions.updateTaskTC.fulfilled(payload,'reqId',payload))
        expect(endState['1'][0].title).toBe(title)
    })
    test('change task status', () => {
        let payload = {taskId:'1', todoId:'1', model:newTaskState};
        const endState = taskReducer(startState, taskActions.updateTaskTC.fulfilled(payload,'reqId',payload))
        expect(endState['1'][0].status).toBe(TaskStatus.Completed)
    })
    test('remove todo = remove task', () => {
        const endState = taskReducer(startState, todoListActions.deleteTodoTC.fulfilled('1','reqId','1'))
        const keys = Object.keys(endState)
        expect(keys.length).toBe(1)
        expect(endState['1']).toBeUndefined()
    })
    test('when added todolist we should added task with empty array',() => {
        const action = todoListActions.fetchTodoTC.fulfilled(startTodoListState,'reqId')
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
        let payload = {id:"1",tasks:startStateTaskTypeAPI};
        const action = taskActions.fetchTasksTC.fulfilled(payload,"1","1")
        const endState = taskReducer({['1']: [], ['2']: [],}, action)
        expect(endState['1'].length).toBe(2)
        expect(endState['2'].length).toBe(0)
    })
})