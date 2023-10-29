import { v1 } from "uuid";
import {
    changeTodoFilterAC, changeTodoStatusAC,
    createNewTodoAC,
    deleteTodoAC, setTodoListAC,
    todoListReducer,
    TodoListReducerType,
    updateTodoTitleAC
} from "./todo-list-reducer";
let startState:TodoListReducerType[];
let startTodoApiState: TodoListReducerType[]
let title:string;
let todoListId1 = v1();
let todoListId2 = v1();
let newTodoListType:TodoListReducerType

beforeEach(() => {
    startState = [
        {id:todoListId1,title:"What to learn",filter:"all",addedDate:new Date(),order:0,entityStatus:'idle'},
        {id:todoListId2,title:"What to buy",filter:"all",addedDate:new Date(),order:0,entityStatus:'idle'},
    ]
    startTodoApiState = [
        {id:todoListId1,title:"What to learn",filter:'all',addedDate:new Date(),order:0,entityStatus:'idle'},
        {id:todoListId2,title:"What to buy",filter:'all',addedDate:new Date(),order:0,entityStatus:'idle'},
    ]
    title = 'new todo title'
    newTodoListType = {id:'1',title:title,filter:"all",addedDate:new Date(),order:0,entityStatus:'idle'}
})

describe('todo-lists',() => {
    test('add new todo',() => {
        const endState = todoListReducer(startState,createNewTodoAC({todoList:newTodoListType}))
        expect(endState.length).toBe(3)
        expect(endState[0].title).toBe(title)
    })
    test('remove todo',() => {
        const endState = todoListReducer(startState,deleteTodoAC({todoId:todoListId1}))
        expect(endState.length).toBe(1)
    })
    test('change todo title',() => {
        const endState = todoListReducer(startState,updateTodoTitleAC({title,todoId:todoListId1}))
        expect(endState.length).toBe(2)
        expect(endState[0].title).toBe(title)
    })
    test('change todo filter',() => {
        const endState = todoListReducer(startState,changeTodoFilterAC({todoId:todoListId1,filter:'completed'}))
        expect(endState.length).toBe(2)
        expect(endState[0].filter).toBe('completed')
    })
    test('change todo status',() => {
        const endState = todoListReducer(startState,changeTodoStatusAC({todoId:todoListId1,entityStatus:'loading'}))
        expect(endState.length).toBe(2)
        expect(endState[0].entityStatus).toBe('loading')
    })
    test('set todolist to the state',() => {
        const endState = todoListReducer([],setTodoListAC({todoList:startTodoApiState}))
        expect(endState.length).toBe(2)
    })
})