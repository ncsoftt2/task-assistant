import {Box, TextField} from "@mui/material";
import {FC, memo} from "react";
import {useAddItemForm} from "common/components/AddItemForm/useAddItemForm";

export type AddItemFormProps = {
    callback: (title: string) => Promise<any>
}

export const AddItemForm: FC<AddItemFormProps> = memo(({callback}) => {
    const {
        handleChange,
        error,
        errorMessage,
        value,
        disableValue,
        addNewItemOnEnter
    } = useAddItemForm(callback)


    return (
        <Box style={{display: 'flex', justifyContent: 'center'}}>
            <TextField id="outlined-basic"
                       value={value}
                       onChange={handleChange}
                       error={error}
                       style={{width: '300px'}}
                       helperText={errorMessage}
                       onKeyDown={addNewItemOnEnter}
                       disabled={disableValue}
            />
        </Box>
    )
})