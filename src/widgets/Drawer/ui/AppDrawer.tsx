import React, {FC} from "react";
import {Box, Drawer} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import {useActions} from "common/hooks/useActions";
import {authActions, authSelectors} from "features/auth";
import {useAppSelector} from 'common/hooks/useAppSelector';

const imgUrl = 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'

type PropsType = {
    drawerOpen: boolean
    setDrawerOpen: (b: boolean) => void
}

export const AppDrawer: FC<PropsType> = ({drawerOpen, setDrawerOpen}) => {
    const userData = useAppSelector(authSelectors.userDataSelector)
    const {logout} = useActions(authActions)
    const handleLogout = () => {
        logout()
        setDrawerOpen(false)
    }
    const handleToggleDrawer = () => setDrawerOpen(false)
    const style = {
        borderWidth: "1px",
        borderColor: "rgba(0,0,0,0.35)",
        borderStyle: "solid",
        padding: "5px",
        borderRadius: '10px'
    }
    return (
        <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{position: "relative", padding: 3, mt: 2, textAlign: 'center'}}>
                <img style={{width: '80px', height: '80px', borderRadius: '50%',marginBottom:'15px'}} src={imgUrl} alt={'ava'}/>
                <Box sx={style}>{userData?.login}</Box>
            </Box>
            <CloseIcon onClick={handleToggleDrawer} sx={{position: "absolute", top: 0, right: 0, cursor: 'pointer'}}/>
            <Button color="inherit" onClick={handleLogout} sx={{
                backgroundColor: "#ff5252",
                color: "#FFF",
                position: 'absolute',
                left: '50%',
                bottom: '20px',
                transition: 'all .2s linear',
                transform: 'translate(-50%)',
                "&:hover": {
                    backgroundColor: '#ff1a1a'
                }
            }}>logout</Button>
        </Drawer>
    )
}