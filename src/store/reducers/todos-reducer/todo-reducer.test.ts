import {TodoListType} from "../../../types/todos-types";
import {todoReducer} from "./todo-reducer";
import {addNewTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodoAC} from "./todo-actions";

const startState:TodoListType = {
    todoList: [
        {id:"1",title:"what to learn",filter:"all"},
        {id:"2",title:"what to buy",filter:"all"},
        {id:"3",title:"what to ear",filter:"all"},
    ]
}
const title = 'new todo title'

it('correct todo should be removed',() => {
    const endState = todoReducer(startState,removeTodoAC('1'))
    expect(endState.todoList.length).toBe(2)
})
it('correct todo should be added',() => {
    const endState = todoReducer(startState,addNewTodoAC(title))
    expect(endState.todoList.length).toBe(4)
    expect(endState.todoList[3].title).toBe(title)
})
it('correct todo title should be changed',() => {
    const endState = todoReducer(startState,changeTodoTitleAC('1',title))
    expect(endState.todoList[0].title).toBe(title)
})
it('correct todo filter should be changed',() => {
    const endState = todoReducer(startState,changeTodoFilterAC('1','active'))
    expect(endState.todoList[0].filter).toBe('active')
})