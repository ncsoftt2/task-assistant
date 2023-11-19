import {FC} from "react";
import {Box, Button, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@mui/material"
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import * as Yup from 'yup';
import { isRejectedWithValue } from "@reduxjs/toolkit";
import {taskActions} from "features/Tasks/index";
import { taskPriority } from "common/utils";
import {useAppDispatch} from "common/hooks/useAppDispatch";

type PropsType = {
    id: string
}

const validationSchema = Yup.object({
    title: Yup.string().required('Обязательное свойство').min(3,'Минимум 3 символа').max(20,'Максимум 20 символов'),
    description: Yup.string().required('Обязательное свойство').min(3,'Минимум 3 символа').max(80,'Максимум 80 символов')
})

export const CreateTaskForm:FC<PropsType> = ({id}) => {
    const dispatch = useAppDispatch()
    const gridPadding = {
        padding:'10px'
    }
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            priority: 1 || 2 || 3 || 4 || 5,
            deadline: new Date()
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm,setSubmitting }) => {
            setSubmitting(true)
            const action = await dispatch(taskActions.createTaskTC({ id, payload: values }));
            if(!isRejectedWithValue(action)) {
                resetForm()
            }
            setSubmitting(false)
        },
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormGroup>
                    <Grid container>
                        <Grid item xs={12} md={7} style={gridPadding}>
                            <FormLabel>Название:</FormLabel>
                            <Box>
                                <FormControl fullWidth>
                                    <TextField margin="normal"
                                               style={{margin: 0}}
                                               helperText={formik.touched.title && formik.errors.title}
                                               {...formik.getFieldProps('title')}
                                    />
                                </FormControl>
                            </Box>
                            <FormLabel>Описание:</FormLabel>
                            <Box>
                                <FormControl fullWidth>
                                    <TextField margin="normal"
                                               style={{margin: 0}}
                                               multiline
                                               maxRows={3}
                                               helperText={formik.touched.description && formik.errors.description}
                                               {...formik.getFieldProps('description')}
                                    />
                                </FormControl>
                            </Box>
                            <FormLabel>deadline:</FormLabel>
                            <Box>
                                <FormControl fullWidth>
                                    <TextField
                                        id="date"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...formik.getFieldProps('deadline')}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={5} style={gridPadding}>
                            <FormLabel>Приоритет:</FormLabel>
                            <RadioGroup defaultValue={taskPriority[0].priority} {...formik.getFieldProps('priority')}>
                                {taskPriority.map(({priority, label}) => {
                                    return <FormControlLabel key={label}
                                                             value={priority}
                                                             control={<Radio/>}
                                                             label={label}
                                                             name={'priority'}
                                    />
                                })}
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Button type={'submit'}
                            disabled={formik.isSubmitting}
                            variant={'contained'}
                            color={'primary'}>create</Button>
                </FormGroup>
            </FormControl>
        </form>
    )
}


