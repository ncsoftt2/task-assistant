import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {ChangeEvent, FC, useState} from "react";
import React,{KeyboardEvent} from "react";

type PropsType = {
    callback: (title: string) => void
    maxLengthValue: number
}

export const AddItemForm: FC<PropsType> = React.memo(({callback,maxLengthValue}) => {
    console.log('add item form')
    const [value, setValue] = useState('')
    const [lengthError,setLengthError] = useState(false)
    const [error,setError] = useState(false)
    const handleAddItem = () => {
        if (value.trim().length !== 0 && value.length <= maxLengthValue) {
            callback(value)
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
        if(target.length > maxLengthValue) {
            setLengthError(true)
        }else if(lengthError){
            setLengthError(false)
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
                sx={{padding:0}}
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
})