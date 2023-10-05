import {Meta, StoryObj} from "@storybook/react";
import {TodoList} from "../../components/todo-list/todo-list";
import {MainStoreDecorators} from "../MainStoreDecorators";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store";
import {TodoListType} from "../../types/todos-types";
import {useLayoutEffect} from "react";
import {addNewTodoAC} from "../../store/reducers/todos-reducer/todo-actions";

const meta: Meta = {
    title:"TODOLISTS/TodoList",
    component: TodoList,
    tags:['autodocs'],
    argTypes: {
        todoList: {
            description: 'todolist',
            control:'object'
        }
    },
    decorators: [MainStoreDecorators]
}

export default meta;
type Story = StoryObj<typeof TodoList>

const TodoListExample = () => {
    let todoList = useSelector<AppState,TodoListType[]>(state => state.todoList)
    const dispatch= useDispatch()
    useLayoutEffect(() => {
        if(!todoList.length) dispatch(addNewTodoAC('new todo title'))
    });
    return !todoList[0] ? <></> : <TodoList todoList={todoList[0]}/>
}

export const TodoListStory: Story = {
    render:() => <TodoListExample />
}