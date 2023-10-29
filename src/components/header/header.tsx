import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Box, LinearProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { logoutTC } from '../../features/Login/auth-reducer';

export const Header = () => {
    const {isAuth} = useAppSelector(({auth}) => auth)
    const {status,userData} = useAppSelector(({app}) => app)
    const dispatch = useAppDispatch()
    const handleLogout = () => dispatch(logoutTC())
    const style = {
        borderWidth: "1px",
        borderColor: "rgba(255,255,255,0.35)",
        borderStyle: "solid",
        padding: "5px",
        borderRadius: '10px'
    }
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
                {isAuth && (
                    <Box sx={{display:'flex',alignItems:'center'}}>
                        <Box sx={style}>{userData?.login}</Box>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Box>
                )}
                {!isAuth && <Link to={routes.login}>Login</Link>}
            </Toolbar>
            {status === 'loading' &&
                <LinearProgress sx={{position: 'absolute', width: '100%', bottom: 0}} color="error"/>}
        </AppBar>

    )
}