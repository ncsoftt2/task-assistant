import {TaskPriority, TaskStatus, TaskType} from "../../api/task-api";
import * as React from "react";
import {ChangeEvent, FC, useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {updateTaskThunk} from "../../store/reducers/tasks/task-actions";


type PropsType = {
    todoId:string
    task:TaskType
}

const taskStatus = [
    {label: 'New', status: TaskStatus.New},
    {label: 'In progress', status: TaskStatus.InProgress},
    {label: 'Completed', status: TaskStatus.Completed},
    {label: 'Draft', status: TaskStatus.Draft},
]

const taskPriority = [
    {label: 'Low', priority: TaskPriority.Low},
    {label: 'Middle', priority: TaskPriority.Middle},
    {label: 'High', priority: TaskPriority.High},
    {label: 'Urgently', priority: TaskPriority.Urgently},
    {label: 'Later', priority: TaskPriority.Later}
]

export const EditableTask:FC<PropsType> = ({task,todoId}) => {
    const taskUpdateStatus = useAppSelector(state => state.app.status)
    const errorMessage = useAppSelector(state => state.app.error)
    const [title,setTitle] = useState(task.title)
    const [description,setDescription] = useState(task.description)
    const [status,setStatus] = useState(task.status)
    const [priority,setPriority] = useState(task.priority)
    const handleChangeDescription = (e:ChangeEvent<HTMLInputElement>) => {
        setDescription(e.currentTarget.value)
    }
    const handleChangeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const handleChangeStatus = (e: SelectChangeEvent<TaskStatus>) => {
        setStatus(+e.target.value)
    }
    const handleChangePriority = (e: SelectChangeEvent<TaskPriority>) => {
        setPriority(+e.target.value)
    }

    const dispatch = useAppDispatch()
    const updateTask = () => {
        dispatch(updateTaskThunk(todoId,task.id, {title,description,status,priority}))
    }
    const styleTask = {
        color:'white',
        padding:'10px',
        borderRadius:'20px',
        backgroundColor:`${taskUpdateStatus === 'succeeded' ? "green" : "red"}`,
        textAlign:'center',
        margin:'10px 0'
    }
    return (
        <Box sx={{display:'flex',justifyContent:'center'}}>
            <Box>
                <Box sx={{display:'flex',alignItems:'center',margin:'10px 0'}}>
                    <TextField
                        label={'Title'}
                        value={title}
                        onChange={handleChangeTitle}
                        autoFocus
                        size={'small'}
                        sx={{fontFamily:'inherit',width:'100%'}}
                    />
                </Box>
                <Box sx={{display:'flex',alignItems:'center',margin:'10px 0'}}>
                    <TextField
                        id="outlined-multiline-flexible"
                        value={description}
                        multiline
                        maxRows={4}
                        label={'Description'}
                        sx={{width:'100%'}}
                        onChange={handleChangeDescription}
                    />
                </Box>
                <Box sx={{margin:'10px 0'}}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                value={status}
                                label="Status"
                                onChange={handleChangeStatus}
                            >
                                {taskStatus.map(({status,label}) => {
                                    return <MenuItem key={label} value={status}>{label}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box sx={{margin:'10px 0'}}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                            <Select
                                value={priority}
                                label="Priority"
                                onChange={handleChangePriority}
                            >
                                {taskPriority.map(({priority,label}) => {
                                    return <MenuItem key={label} value={priority}>{label}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box sx={{textAlign:'center'}}>
                    <Button onClick={updateTask} variant={'contained'} color={'primary'}>save</Button>
                </Box>
                {taskUpdateStatus === 'succeeded' && <Box sx={styleTask}>update is success</Box>}
                {taskUpdateStatus === 'failed' && <Box sx={styleTask}>{errorMessage}</Box>}
            </Box>
        </Box>
    )
}