import {Meta, StoryObj} from "@storybook/react";
import {MainStoreDecorators} from "./MainStoreDecorators";
import {EditableTask} from "../components/Task/EditableTask";
import {TaskDomainType} from "../store/reducers/tasks/task-reducer";

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
        task: taskObj,
        todoId: '1'
    },
    decorators: [MainStoreDecorators]
}

export default meta;
type Story = StoryObj<typeof EditableTask>

export const EditableSpanStory: Story = {
}