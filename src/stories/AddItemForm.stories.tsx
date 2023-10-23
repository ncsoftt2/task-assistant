import {AddItemForm, FormPropsType} from "../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import {MainStoreDecorators} from "./MainStoreDecorators";
import {Meta, StoryObj} from "@storybook/react";
import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        callback: {
            description: "Button clicked inside form",
            action: "clicked"
        }
    },
    decorators: [MainStoreDecorators]
}

export default meta;

type Story = StoryObj<typeof AddItemForm>
const AddItemFormWithError = (props: FormPropsType) => {
    const [value, setValue] = useState('')
    const [lengthError,setLengthError] = useState(false)
    const [error,setError] = useState(true)
    const handleAddItem = () => {
        if (value.trim().length !== 0) {
            props.callback(value)
            setValue('')
        } else {
            setError(true)
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value
        if (error) {
            setError(false)
        }
        setValue(target)
    }
    const addItemOnEnter = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') handleAddItem()
    }
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <TextField
                size={'small'}
                id="standard-basic"
                variant="outlined"
                value={value}
                onChange={handleChange}
                sx={{padding: 0}}
                error={lengthError || error}
                onKeyDown={addItemOnEnter}
            />
            <Button
                onClick={handleAddItem}
                size={"small"}
                disableElevation
                variant={'contained'}
                sx={{padding: 1}}
            ><AddIcon fontSize={"small"}/>
            </Button>
        </Box>
    )
}

export const AddItemFormDefaultStory: Story = {
    args: {
        callback: action('Button clicked inside form'),
    }
}
export const AddItemFormWithErrorStory: Story = {
    render: () => <AddItemFormWithError callback={action('')} />
}
