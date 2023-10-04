import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {FC} from "react";
import React from "react";
import {useAddItemForm} from "./hooks/useAddItemForm";
import {useWindowSize} from "../useWindowSize/useWindowSize";

type PropsType = {
    callback: (title: string) => void
    maxLengthValue: number
}

export const AddItemForm: FC<PropsType> = React.memo(({callback, maxLengthValue}) => {
    const {
        value, handleChange, lengthError, error,
        addItemOnEnter, handleAddItem
    } = useAddItemForm(maxLengthValue, callback)
    const size = useWindowSize()
    return (
        size > 1000
            ? <Box sx={{display: 'flex', alignItems: 'center'}}>
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

            : <Box sx={{display: 'flex', alignItems: 'center'}}>
                <TextField
                    size={'small'}
                    id="standard-basic"
                    variant="outlined"
                    value={value}
                    onChange={handleChange}
                    sx={{padding: '5px 10px'}}
                    error={lengthError || error}
                    onKeyDown={addItemOnEnter}
                />
                <Button
                    onClick={handleAddItem}
                    size={"small"}
                    disableElevation
                    variant={'contained'}
                    sx={{minWidth:'30px',padding:'5px'}}
                ><AddIcon fontSize={"small"} sx={{fontSize:'15px'}}/>
                </Button>
            </Box>

    )
})

// export const AddItemForm: FC<PropsType> = React.memo(({callback,maxLengthValue}) => {
//     const [value, setValue] = useState('')
//     const [lengthError,setLengthError] = useState(false)
//     const [error,setError] = useState(false)
//     const handleAddItem = () => {
//         if (value.trim().length !== 0 && value.length <= maxLengthValue) {
//             callback(value)
//             setValue('')
//         } else {
//             setError(true)
//         }
//     }
//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const target = e.currentTarget.value
//         if (error) {
//             setError(false)
//         }
//         if(target.length > maxLengthValue) {
//             setLengthError(true)
//         }else if(lengthError){
//             setLengthError(false)
//         }
//         setValue(target)
//     }
//     const addItemOnEnter = (e:KeyboardEvent<HTMLInputElement>) => {
//         if(e.key === 'Enter') handleAddItem()
//     }
//     return (
//         <Box sx={{display: 'flex', alignItems: 'center'}}>
//             <TextField
//                 size={'small'}
//                 id="standard-basic"
//                 variant="outlined"
//                 value={value}
//                 onChange={handleChange}
//                 sx={{padding:0}}
//                 error={lengthError || error}
//                 onKeyDown={addItemOnEnter}
//             />
//             <Button
//                 onClick={handleAddItem}
//                 size={"small"}
//                 disableElevation
//                 variant={'contained'}
//                 sx={{padding: 1}}
//             ><AddIcon fontSize={"small"}/>
//             </Button>
//         </Box>
//     )
// })