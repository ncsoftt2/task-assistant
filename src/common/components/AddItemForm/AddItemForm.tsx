import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, FC, memo, useState, KeyboardEvent} from "react";
import {makeStyles, Theme} from "mui-styles";
import AddIcon from '@mui/icons-material/Add';

const useAddItemFormStyles = makeStyles<Theme>(() => ({
    customInput: {
        '& .MuiInputBase-input': {
            padding: '5px'
        },
        '& .MuiFormHelperText-root': {
            width:"300px",
            lineHeight: 1,
            margin: 0,
            padding: 0,
            position: 'absolute',
            top: 40,
            left: 0,
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: 'rgba(10,41,91,0.66)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgba(10,41,91,0.66)',
                borderWidth: 1,
            },
        },
    },
    customButton: {
        padding: 3,
        width: '100%',
        maxWidth:10,
        borderColor: 'rgba(47,47,47,0.25)',
        borderStyle: 'solid',
        borderWidth: 1
    }
}))

export type FormPropsType = {
    callback: (title:string) => void
    disabled?: boolean
    maxLengthTitle: number
}

export const AddItemForm:FC<FormPropsType> = memo(({callback,maxLengthTitle}) => {
    const [value,setValue] = useState('')
    const [error,setError] = useState(false)
    const [lengthError,setLengthError] = useState(false)
    const errorMessage = error && 'Enter title' || lengthError && `Max length symbols ${maxLengthTitle}`
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value
        if (error) {
            setError(false)
        }
        if(target.length > maxLengthTitle) {
            setLengthError(true)
        }else if(lengthError){
            setLengthError(false)
        }
        setValue(target)
    }
    const handleClick = () => {
        const trimValue = value.trim()
        if(trimValue.length !== 0 && value.length <= maxLengthTitle) {
            callback(value)
            setValue('')
        } else if (trimValue.length === 0) {
            setError(true)
        } else if(trimValue.length > maxLengthTitle) {
            setLengthError(true)
        }
    }
    const addNewItemOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') handleClick()
    }
    const classes = useAddItemFormStyles()
    return (
        <Box sx={{display:'flex',alignItems:'center'}}>
            <TextField id="outlined-basic"
                       className={classes.customInput}
                       value={value}
                       onChange={handleChange}
                       error={lengthError || error}
                       helperText={errorMessage}
                       onKeyDown={addNewItemOnEnter}
            />
            <Button className={classes.customButton} onClick={handleClick} disabled={error || lengthError}>
                <AddIcon/>
            </Button>
        </Box>

    )
})