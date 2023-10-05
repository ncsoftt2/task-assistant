import { action } from "@storybook/addon-actions";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import {Meta, StoryObj} from "@storybook/react";
import {MainStoreDecorators} from "./MainStoreDecorators";

const meta: Meta<typeof EditableSpan> = {
    title:"TODOLISTS/EditableSpan",
    component: EditableSpan,
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
        title: "start value",
        updateItem: action('value changed')
    },
    decorators: [MainStoreDecorators]
}

export default meta;
type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory: Story = {
}