import { v1 } from "uuid";
import {fetchTodoTC} from "../thunk/fetchTodoList";
import {createTodoTC} from "../thunk/createTodo";
import {deleteTodoTC} from "../thunk/deleteTodo";
import {updateTodoTitleTC} from "../thunk/updateTodoTitle";
import {clearDataAC} from "common/actions/clearData";
import {todoListActions} from "../../index";
import {TodoListReducerType, todoReducer} from "../slice/todoSlice";
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
        const endState = todoReducer(startState,createTodoTC.fulfilled(newTodoListType,'reqId', title))
        expect(endState.length).toBe(3)
        expect(endState[0].title).toBe(title)
    })
    test('remove todo',() => {
        const endState = todoReducer(startState,deleteTodoTC.fulfilled(todoListId1,'reqId',todoListId1))
        expect(endState.length).toBe(1)
    })
    test('change todo title',() => {
        let payload = {title,todoId:todoListId1};
        const endState = todoReducer(startState,updateTodoTitleTC.fulfilled(payload,'reqId',payload))
        expect(endState.length).toBe(2)
        expect(endState[0].title).toBe(title)
    })
    test('change todo filter',() => {
        let action = todoListActions.changeTodoFilterAC({todoId:todoListId1,filter:'completed'});
        const endState = todoReducer(startState,action)
        expect(endState.length).toBe(2)
        expect(endState[0].filter).toBe('completed')
    })
    test('change todo status',() => {
        let action = todoListActions.changeTodoStatusAC({todoId:todoListId1,entityStatus:'loading'});
        const endState = todoReducer(startState,action)
        expect(endState.length).toBe(2)
        expect(endState[0].entityStatus).toBe('loading')
    })
    test('set todolist to the state',() => {
        const endState = todoReducer([],fetchTodoTC.fulfilled(startTodoApiState,'reqId'))
        expect(endState.length).toBe(2)
    })
    test('clear data after logout',() => {
        const endState = todoReducer(startState,clearDataAC())
        expect(endState).toEqual([])
    })
})