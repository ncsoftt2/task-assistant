import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {LinearProgress} from "@mui/material";
import {useAppSelector} from "../../store/hooks";

export const Header = () => {
    const status = useAppSelector(state => state.app.status)
    return (
        <AppBar position="static" color={'primary'} elevation={0}>
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
                <Button color="inherit">Login</Button>
            </Toolbar>
            {status === 'loading' && <LinearProgress color="error"/>}
        </AppBar>

    )
}