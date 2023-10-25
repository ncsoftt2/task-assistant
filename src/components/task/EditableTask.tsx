import {TaskPriority, TaskStatus} from "../../api/task-api";
import * as React from "react";
import {FC} from "react";
import {Box, Button, Select, TextField} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {useAppSelector} from "../../store/hooks";
import {useUtilsEditableTask} from "../../utils/utilsEditableTask";
import {TaskDomainType} from "../../store/reducers/tasks/task-reducer";


type PropsType = {
    todoId:string
    task:TaskDomainType
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
    const errorMessage = useAppSelector(state => state.app.error)
    const {styleTask,
        updateStatus,
        updateTask,
        handleChangePriority,
        handleChangeStatus,
        handleChangeTitle,
        handleChangeDescription,
        title, status,priority,description
    } = useUtilsEditableTask(task.taskStatus,task,todoId)
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
                    <Button onClick={updateTask} variant={'contained'} color={'primary'}
                            disabled={updateStatus === 'loading'}
                    >save</Button>
                </Box>
                {updateStatus === 'succeeded' && <Box sx={styleTask}>update is success</Box>}
                {updateStatus === 'failed' && <Box sx={styleTask}>{errorMessage}</Box>}
            </Box>
        </Box>
    )
}