import {Meta, StoryObj} from "@storybook/react";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const meta: Meta<typeof AddItemForm> = {
    title: "AddItemForm",
    component: AddItemForm,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        callback: {
            description: "click on button",
            action: "clicked"
        }
    }
}

export default meta;
type Story = StoryObj<typeof AddItemForm>


const CreateAddItemForm = (props: any) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(props.error);
    const [disableValue, setDisableValue] = useState(props.disableValue);
    const [errorMessage, setErrorMessage] = useState('');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value;
        if (error) {
            setError(false);
        }
        setValue(target);
    };

    const handleClick = async () => {
        setDisableValue(true);
        const trimValue = value.trim();
        if (trimValue.length !== 0) {
            try {
                await props.callback(value);
                setValue('');
            } catch (err) {
                const errMessage = err as { message: string };
                setError(true);
                setErrorMessage(errMessage.message);
            }
        } else {
            setError(true);
            setErrorMessage('Title is required');
        }
        setDisableValue(false);
    };

    const addNewItemOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    };
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                id="outlined-basic"
                value={value}
                onChange={handleChange}
                error={error}
                helperText={error ? 'Title is required' : ''}
                onKeyDown={addNewItemOnEnter}
                disabled={disableValue}
            />
            <Button
                onClick={handleClick}
                disabled={disableValue}
            >
                <AddIcon />
            </Button>
        </Box>
    )
}

export const AddItemFormStory: Story = {}
export const AddItemFormWithErrorStory: Story = {
    render: () => <CreateAddItemForm error={true} disableValue={false} />
}
export const AddItemFormWithDisabledPropertiesStory: Story = {
    render: () => <CreateAddItemForm error={false} disableValue={true} />
}