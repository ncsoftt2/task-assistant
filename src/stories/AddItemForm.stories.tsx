import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import {MainStoreDecorators} from "./MainStoreDecorators";

export default {
    title:"Add item form component",
    component: AddItemForm,
    decorators: [MainStoreDecorators]
}

const item = action('added')

export const AddItemFormExample = () => {
    return <AddItemForm callback={item} maxLengthValue={10} />
}