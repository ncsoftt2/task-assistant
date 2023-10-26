import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {LinearProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {logoutTC} from "../../features/Login/auth-actions";
import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';

export const Header = () => {
    const {isAuth} = useAppSelector(({auth}) => auth)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()
    const handleLogout = () => dispatch(logoutTC())
    return (
        <AppBar position="static" color={'primary'} elevation={0} sx={{position: 'relative'}}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>ToDo</Typography>
                {isAuth && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
                {!isAuth && <Link to={routes.login}>Login</Link>}
            </Toolbar>
            {status === 'loading' &&
                <LinearProgress sx={{position: 'absolute', width: '100%', bottom: 0}} color="error"/>}
        </AppBar>

    )
}