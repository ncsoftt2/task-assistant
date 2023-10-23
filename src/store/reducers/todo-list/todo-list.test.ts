import { v1 } from "uuid";
import {todoListReducer, TodoListReducerType} from "./todo-list-reducer";
import {
    changeTodoFilterAC,
    changeTodoStatusAC,
    createNewTodoAC,
    deleteTodoAC,
    setTodoListAC,
    updateTodoTitleAC
} from "./todo-list-actions";
import {TodoListType} from "../../../api/todo-list-api";
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
        const endState = todoListReducer(startState,createNewTodoAC(newTodoListType))
        expect(endState.length).toBe(3)
        expect(endState[0].title).toBe(title)
    })
    test('remove todo',() => {
        const endState = todoListReducer(startState,deleteTodoAC(todoListId1))
        expect(endState.length).toBe(1)
    })
    test('change todo title',() => {
        const endState = todoListReducer(startState,updateTodoTitleAC(todoListId1,title))
        expect(endState.length).toBe(2)
        expect(endState[0].title).toBe(title)
    })
    test('change todo filter',() => {
        const endState = todoListReducer(startState,changeTodoFilterAC(todoListId1,'completed'))
        expect(endState.length).toBe(2)
        expect(endState[0].filter).toBe('completed')
    })
    test('change todo status',() => {
        const endState = todoListReducer(startState,changeTodoStatusAC(todoListId1,'loading'))
        expect(endState.length).toBe(2)
        expect(endState[0].entityStatus).toBe('loading')
    })
    test('set todolist to the state',() => {
        const endState = todoListReducer([],setTodoListAC(startTodoApiState))
        expect(endState.length).toBe(2)
    })
})