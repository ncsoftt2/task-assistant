import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {UniversalModal} from "./UniversalModal";
import {FC, memo, ReactNode} from 'react';
import InfoIcon from '@mui/icons-material/Info';
import {TaskType} from "../../api/task-api";
import {EditableTask} from "../Task/EditableTask";
import {TaskInfo} from "../Task/TaskInfo";


type PropsType = {
    callback: () => void
    task:TaskType
    todoId:string
}

export const EditMenu:FC<PropsType> = memo(({callback,todoId,task}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const removeTask = () => {
        callback()
        setAnchorEl(null)
    }
    const handleOpenEditModal = () => {
        setOpenEditModal(true)
    }
    return (
        <div>
            <Button onClick={handleClick}
                    sx={{padding:0,minWidth:'20px'}}
            >
                <MoreVertIcon sx={{color:'black'}}/>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={removeTask}>
                    <DeleteForeverIcon/>
                </MenuItem>
                <MenuItem onClick={handleOpenEditModal}>
                    <ModeEditIcon/>
                </MenuItem>
            </Menu>
            {openEditModal && <UniversalModal openModal={openEditModal} setOpenModal={setOpenEditModal}>
                <EditableTask task={task} todoId={todoId}/>
            </UniversalModal>
            }
        </div>
    )
})


