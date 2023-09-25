import { action } from "@storybook/addon-actions";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";

export default {
    title: 'Editable span',
    component: EditableSpan
}

const callback = action('on change')

export const EditableSpanExample = () => <EditableSpan title='Start value' updateItem={callback} />