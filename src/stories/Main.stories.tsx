import {Meta, StoryObj} from "@storybook/react";
import {MainStoreDecorators} from "./MainStoreDecorators";
import {App} from "../components/App/App";


const meta: Meta<typeof App> = {
    title: "TODOLISTS/App",
    component: App,
    tags: ['autodocs'],
    decorators: [MainStoreDecorators],
}

export default meta;
type Story = StoryObj<typeof App>

export const AppStory:Story = {
    render: () => <App demo={true}/>
}