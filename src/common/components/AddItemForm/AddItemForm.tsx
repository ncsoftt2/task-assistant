import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, FC, memo, useState, KeyboardEvent} from "react";
import {makeStyles, Theme} from "mui-styles";
import AddIcon from '@mui/icons-material/Add';
import {BaseResponseType} from "common/types";

export const useAddItemFormStyles = makeStyles<Theme>(() => ({
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

export type AddItemFormProps = {
    callback: (title:string) => Promise<any>
}

export const AddItemForm:FC<AddItemFormProps> = memo(({callback}) => {
    const [value,setValue] = useState('')
    const [error,setError] = useState(false)
    const [disableValue,setDisableValue] = useState(false)
    const [errorMessage,setErrorMessage] = useState('')
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value
        if(error) {
            setError(false)
            setErrorMessage('')
        }
        setValue(target)
    }
    const handleClick = async () => {
        setDisableValue(true)
        const trimValue = value.trim()
        if(trimValue.length !== 0) {
            callback(value)
                .then(() => {
                    setValue('')
                })
                .catch((err:BaseResponseType) => {
                    setError(true)
                    if(err?.resultCode) {
                        setErrorMessage(err.messages[0])
                    }
                })
        } else {
            setError(true)
            setErrorMessage('Title is required')
        }
        setDisableValue(false)
    }
    const addNewItemOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            handleClick()
        }
    }
    const classes = useAddItemFormStyles()
    return (
        <Box sx={{display:'flex',alignItems:'center'}}>
            <TextField id="outlined-basic"
                       className={classes.customInput}
                       value={value}
                       onChange={handleChange}
                       error={error}
                       helperText={errorMessage}
                       onKeyDown={addNewItemOnEnter}
                       disabled={disableValue}
            />
            <Button className={classes.customButton} onClick={handleClick} disabled={disableValue}>
                <AddIcon/>
            </Button>
        </Box>

    )
})