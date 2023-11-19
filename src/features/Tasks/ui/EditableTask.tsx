import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import {Box, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {makeStyles, Theme} from "mui-styles";
import {FC, memo} from "react";
import {taskPriority, taskStatus} from "common/utils";
import { TaskDomainType } from "../model/slice/taskSlice";
import { useEditableTask } from "./hooks/useEditableTask";

const useEditableTaskForm = makeStyles<Theme>(() => ({
    customInput: {
        '& .MuiInputBase-root': {
            padding: 0
        },
        '& .MuiInputBase-input': {
            padding: 5,
        },
        '& .MuiFormHelperText-root': {
            lineHeight: 1,
            margin: 0,
            padding: 0,
            position: 'absolute',
            bottom: -15,
            left: 0,
            color: '#ff6d6d'
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: 'rgba(10,41,91,0.66)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgba(10,41,91,0.66)',
                borderWidth: 1
            },
        }
    }
}))

type PropsType = {
    task: TaskDomainType
    setOpen: (value: boolean) => void
}

export const EditableTask:FC<PropsType> = memo(({task,setOpen}) => {
    const classes = useEditableTaskForm()
    const {formik} = useEditableTask(task,setOpen)
    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormGroup>
                    <Box sx={{margin: '10px 0 20px'}}>
                        <FormControl fullWidth>
                            <Box>Название</Box>
                            <TextField margin="normal"
                                       style={{margin: 0}}
                                       className={classes.customInput}
                                       helperText={formik.touched.title && formik.errors.title}
                                       {...formik.getFieldProps('title')}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{margin: '0 0 20px'}}>
                        <FormControl fullWidth>
                            <Box>Описание</Box>
                            <TextField margin="normal"
                                       style={{margin:0}}
                                       className={classes.customInput}
                                       helperText={formik.touched.description && formik.errors.description}
                                       multiline
                                       maxRows={3}
                                       {...formik.getFieldProps('description')}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{margin: '0 0 10px'}}>
                        <FormControl fullWidth>
                            <Box>Статус</Box>
                            <Select
                                className={classes.customInput}
                                {...formik.getFieldProps('status')}
                            >
                                {taskStatus.map(({status, label}) => {
                                    return <MenuItem key={label} value={status} sx={{
                                        '&:hover': {
                                            backgroundColor: '#b9b7b7',
                                            transition: 'background-color 0.3s ease'
                                        }
                                    }}>{label}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{margin: '0 0 10px'}}>
                        <FormControl fullWidth>
                            <Box>Приоритет</Box>
                            <Select
                                sx={{maxWidth: '100%'}}
                                className={classes.customInput}
                                {...formik.getFieldProps('priority')}
                            >
                                {taskPriority.map(({priority, label}) => {
                                    return <MenuItem key={label} value={priority} sx={{
                                        '&:hover': {
                                            backgroundColor: '#b9b7b7',
                                            transition: 'background-color 0.3s ease'
                                        }
                                    }}>{label}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            disabled={task.taskStatus === 'loading'}
                    >
                        Update
                    </Button>
                </FormGroup>
            </FormControl>
            {task.taskStatus === 'failed' && (
                <Box sx={{textAlign:'center',mt:'5px',color:'#d50000'}}>try later...</Box>
            )}
        </form>
    )
})