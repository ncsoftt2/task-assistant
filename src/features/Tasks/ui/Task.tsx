import React, {FC, memo, useState} from "react";
import {Box, Button, Checkbox, ListItem, Menu, MenuItem, Typography} from "@mui/material";

import {TaskStatus} from "api/task-api";
import SettingsIcon from '@mui/icons-material/Settings';

import {EditableTask} from "features/Tasks/ui/EditableTask";
import { UniversalModal } from "components/UniversalModal/UniversalModal";
import {TaskDomainType} from "features/Tasks/service/slice/task-reducer";
import {useTaskService, useTaskStyles, useTaskUtilsStyle} from "features/Tasks/ui/hooks";
type PropsType = {
    task: TaskDomainType
    todoId:string
}

export const Task:FC<PropsType> = memo(({task,todoId}) => {
    const [openEditTask, setOpenEditTask] = useState(false);
    const {status,priority,title} = task
    const classes = useTaskStyles()
    const {menuItemStyle,listItemStyle,taskPriorityTriangleColor} = useTaskUtilsStyle(status,priority)
    const {open,
        handleOpenEditModalTask,
        handleClose,
        handleClick,
        anchorEl,
        handleChangeTaskStatus,
        handleDeleteTask,
        taskDeadline
    } = useTaskService(todoId,task,setOpenEditTask)
    const triangleFigure = {
        position:'absolute',
        top:-2,
        right:-10,
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 15px 15px 15px',
        borderColor: `transparent transparent ${taskPriorityTriangleColor} transparent`,
        transform: 'rotate(45deg)'
    }
    return (
        <ListItem sx={listItemStyle}>
            <Box sx={triangleFigure}></Box>
            <Checkbox
                checked={status === TaskStatus.Completed}
                onChange={handleChangeTaskStatus}
                color={'default'}
                size={'small'}
                className={classes.taskCheckBox}
            />
            <Typography variant={'h3'} className={classes.taskTitle}>{title}</Typography>
            <Box>deadline <b>{taskDeadline}</b></Box>
            <Box>
                <Button sx={{color:'black',padding:0,minWidth:"40px",position:'relative','&:hover': {
                        transform: 'rotate(180deg)',
                        transition: 'transform 0.5s ease',
                    }}}
                        onClick={handleClick}>
                    <SettingsIcon/>
                </Button>
                <Menu anchorEl={anchorEl}
                      open={open}
                      className={classes.customList}
                      onClose={handleClose}
                >
                    <MenuItem onClick={handleOpenEditModalTask} sx={menuItemStyle}>Изменить</MenuItem>
                    <MenuItem onClick={handleDeleteTask} sx={menuItemStyle}>Удалить</MenuItem>
                </Menu>
            </Box>
            {
                openEditTask && (
                    <UniversalModal open={openEditTask} setOpen={setOpenEditTask}>
                        <EditableTask task={task} setOpen={setOpenEditTask}/>
                    </UniversalModal>
                )
            }
        </ListItem>
    )
})
