import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useAppSelector} from "../../store/hooks";
import {Navigate} from "react-router-dom";
import {routes} from "../../routes/routes";
import {useLogin} from "./hooks/useLogin";



export const Login = () => {
    const {isAuth} = useAppSelector(({auth}) => auth)
    const {formik} = useLogin()
    if(isAuth) return <Navigate to={routes.main}/>
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>Email: zrm1306@gmail.com</p>
                        <p>Password: 111111</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   helperText={formik.touched.email && formik.errors.email}
                                   {...formik.getFieldProps('email')}
                        />
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   helperText={formik.touched.password && formik.errors.password}
                                   {...formik.getFieldProps('password')}
                        />
                        <FormControlLabel label={'Remember me'} control={<Checkbox
                            name="rememberMe"
                            checked={formik.values.rememberMe}
                            onChange={formik.handleChange}
                        />}/>
                        <Button
                            disabled={formik.isSubmitting}
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}