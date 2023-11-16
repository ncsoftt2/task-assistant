import {FC, memo} from "react";
import {Button} from "@mui/material";

type PropsType = {
    name: string
    callback: () => void
    color: "error" | "primary" | "secondary" | "success"
    variant: "contained" | "outlined" | "text"
}

export const UniversalButton:FC<PropsType> = memo((props) => {
    const {color,name,variant,callback} = props
    return <Button onClick={callback}
                   color={color}
                   variant={variant}
                   sx={{p:'5px 10px',fontSize:'14px'}}
                   disableElevation>{name}</Button>
})