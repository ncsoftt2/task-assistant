
import {todoReducer} from "./todo-reducer";
import {createTodoAC, changeTodoFilterAC, changeTodoTitleAC, deleteTodoAC, setTodoListAC} from "./todo-actions";
import {TodoListReducerType} from "../../../types/todolists-types";
import {TodoListApiType} from "../../../api/todolist-api";

let startState:TodoListReducerType[]
let title:string
let newTodoList: TodoListReducerType

beforeEach(() => {
    startState = [
        {id:"1",title:"what to learn",filter:"all",addedDate:'',order:0},
        {id:"2",title:"what to buy",filter:"all",addedDate:'',order:0},
        {id:"3",title:"what to eat",filter:"all",addedDate:'',order:0},
    ]
    title = 'new todo title'
    newTodoList = {
        filter:"all",addedDate:'',order:0,title:title,id:'1'
    }
})

describe('todo-reducer',() => {
    test('correct todo should be removed',() => {
        const endState = todoReducer(startState,deleteTodoAC('1'))
        expect(endState.length).toBe(2)
    })
    test('correct todo should be added',() => {
        const endState = todoReducer(startState,createTodoAC(newTodoList))
        expect(endState.length).toBe(4)
        expect(endState[0].title).toBe(title)
    })
    test('correct todo title should be changed',() => {
        const endState = todoReducer(startState,changeTodoTitleAC('1',title))
        expect(endState[0].title).toBe(title)
    })
    test('correct todo filter should be changed',() => {
        const endState = todoReducer(startState,changeTodoFilterAC('1','active'))
        expect(endState[0].filter).toBe('active')
    })

    test('todolist should be added to the state',() => {
        const startTodoListState:TodoListReducerType[] = []
        const dataTodoListState:TodoListApiType[] = [
            {id:"1",title:"what to learn",addedDate:'',order:0},
            {id:"2",title:"what to buy",addedDate:'',order:0},
            {id:"3",title:"what to eat",addedDate:'',order:0}
        ]
        const endState = todoReducer(startTodoListState,setTodoListAC(dataTodoListState))
        expect(endState.length).toBe(3)
    })
})