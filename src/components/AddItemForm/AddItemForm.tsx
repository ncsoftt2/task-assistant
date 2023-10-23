import {FC, memo} from "react";
import { Box, makeStyles, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import { useAddItemForm } from "./hooks/useAddItemForm";
import {useAppSelector} from "../../store/hooks";





export type FormPropsType = {
    callback: (title:string) => void
    disabled?: boolean
}
export const AddItemForm:FC<FormPropsType> = memo(({callback,disabled = false}) => {
    const status = useAppSelector(state => state.app.status)
    const {
        value, handleChange, error,
        addItemOnEnter, handleAddItem
    } = useAddItemForm(callback,status)
    return (
        <Box sx={{display: 'flex', alignItems: 'center',justifyContent:'center'}}>
            <TextField
                size={'small'}
                id="standard-basic"
                variant="outlined"
                value={value}
                onChange={handleChange}
                sx={{padding: 0}}
                error={error}
                onKeyDown={addItemOnEnter}
                disabled={disabled}
            />
            <Button
                onClick={handleAddItem}
                size={"small"}
                disableElevation
                variant={'contained'}
                sx={{padding: '6px',minWidth:'20px',width:'40px'}}
                disabled={disabled}
            ><AddIcon fontSize={"small"}/>
            </Button>
        </Box>
    )
})