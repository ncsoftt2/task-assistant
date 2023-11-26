import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {LinearProgress} from "@mui/material";
import { authSelectors } from 'features/auth';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { appStatusSelector } from 'app/app.selectors';

type Props = {
    setDrawerOpen: (b: boolean) => void
}

export const Header:FC<Props> = ({setDrawerOpen}) => {
    const handleOpenDrawer = () => setDrawerOpen(true)
    const data = useAppSelector(authSelectors.userDataSelector)
    const status = useAppSelector(appStatusSelector)
    return (
        <AppBar position="static" color={'primary'} elevation={0} sx={{position: 'relative'}}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                    onClick={handleOpenDrawer}
                    disabled={!data}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>Task  assistant</Typography>
            </Toolbar>
            {status === 'loading' &&
                <LinearProgress sx={{position: 'absolute', width: '100%', bottom: 0}} color="error"/>}
        </AppBar>

    )
}