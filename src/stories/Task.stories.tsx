import React from "react";

import {MainStoreDecorators} from "./MainStoreDecorators";
import {Meta, StoryObj} from "@storybook/react";
import {useSelector} from "react-redux";
import {AppState} from "../store";
import { Task } from "../components/Task/Task";
import {TaskPriority, TaskStatus, TaskType} from "../api/task-api";

const meta: Meta<typeof Task> = {
    title: "TODOLISTS/Task",
    component: Task,
    tags:['autodocs'],
    args: {
        todoId:'1'
    },
    decorators: [MainStoreDecorators]
}

export default meta;
type Story = StoryObj<typeof Task>

const TaskRedux = () => {
    let task = useSelector<AppState,TaskType>(state => state.tasks['1'][0])
    if(!task) task ={
        id: '1',
        title:'unknown',
        status:TaskStatus.New,
        todoListId: '',
        addedDate: new Date(),
        priority:TaskPriority.Low,
        deadline:new Date(),
        description:'',
        order:0,
        startDate: new Date()
    }
    return <Task task={task} todoId={'1'} />
}

export const TaskReduxStory:Story = {
    render: () => <TaskRedux />
}