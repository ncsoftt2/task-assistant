import {Main} from "../components/main/main";
import {Meta, StoryObj} from "@storybook/react";
import {MainStoreDecorators} from "./MainStoreDecorators";

const meta: Meta<typeof Main> = {
    title: "TODOLISTS/Main",
    component: Main,
    tags: ['autodocs'],
    decorators: [MainStoreDecorators],
}

export default meta;
type Story = StoryObj<typeof Main>
export const MainStory: Story = {}