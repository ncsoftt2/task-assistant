import React, {FC} from "react";
import {Box, Drawer} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import {appSelectors} from "../../../app";
import {useActions, useAppSelector} from "app/model/store";
import {authActions} from "features/auth";

const imgUrl = 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'

type PropsType = {
    drawerOpen: boolean
    setDrawerOpen: (b: boolean) => void
}

export const AppDrawer: FC<PropsType> = ({drawerOpen, setDrawerOpen}) => {
    const userData = useAppSelector(appSelectors.appUserDataSelector)
    const {logoutTC} = useActions(authActions)
    const handleLogout = () => {
        logoutTC()
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
            <Box sx={{position: "relative", padding: 3, mt: 2, textAlign:'center'}}>
                <Box>
                    <img style={{width: '80px', height: '80px', borderRadius: '50%'}} src={imgUrl} alt={'ava'}/>
                </Box>
                <Box sx={style}>{userData?.login}</Box>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Box>
            <CloseIcon onClick={handleToggleDrawer} sx={{position: "absolute", top: 0, right: 0, cursor: 'pointer'}}/>
        </Drawer>
    )
}