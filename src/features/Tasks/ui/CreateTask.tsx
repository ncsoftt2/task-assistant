import {FC} from "react";
import {Box, Button, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@mui/material"
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import {taskActions} from "features/Tasks/index";
import { taskPriority } from "common/utils";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {BaseResponseType} from "common/types";

type Props = {
    id: string
}

export const CreateTaskForm:FC<Props> = ({id}) => {
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
        onSubmit: (values, { resetForm,setSubmitting,setFieldError }) => {
            setSubmitting(true)
            dispatch(taskActions.createTask({ id, payload: values }))
                .unwrap()
                .then(() => {
                    resetForm()
                })
                .catch((err:BaseResponseType) => {
                    const errorMessage = err.messages ? err.messages[0] : "Some occured error"
                    const errorField = errorMessage.includes('Description') ? 'description' : "title"
                    err.messages?.forEach(el => {
                        setFieldError(errorField,el)
                    })
                })
                .finally(() => {
                    setSubmitting(false)
                })
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


