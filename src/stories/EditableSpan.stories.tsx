import {Meta, StoryObj} from "@storybook/react";
import {MainStoreDecorators} from "./MainStoreDecorators";
import {TaskDomainType} from "features/Tasks/service/slice/task-reducer";
import { EditableTask } from "features/Tasks";

const taskObj:TaskDomainType = {
    title:'bla',
    taskStatus: 'idle',
    deadline:new Date(),
    status:1,
    startDate:new Date(),
    id:'1',
    addedDate:new Date,
    priority:1,
    order:0,
    description:'desc',
    todoListId:'1',
}

const meta: Meta<typeof EditableTask> = {
    title:"TODOLISTS/EditableSpan",
    component: EditableTask,
    tags: ['autodocs'],
    // argTypes: {
    //     title: {
    //         description: 'Start value'
    //     },
    //     updateItem: {
    //         description: 'Value EditableSpan changed'
    //     }
    // },
    args: {
        task: taskObj
    },
    decorators: [MainStoreDecorators]
}

export default meta;
type Story = StoryObj<typeof EditableTask>

export const EditableSpanStory: Story = {
}