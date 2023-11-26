import {Outlet} from "react-router-dom";
import {Suspense, useEffect, useState} from "react";
import { CircularProgress } from "@mui/material";
import { AppDrawer } from "widgets/Drawer";
import { Header } from "widgets/Header";
import { ErrorSnackBar } from "common/components";
import { useAppSelector } from 'common/hooks/useAppSelector';
import {useActions} from "common/hooks/useActions";
import {appInitializeSelector} from "app/app.selectors";
import {authActions} from "features/auth";


export const App= () => {
    const [drawerOpen,setDrawerOpen] = useState(false)
    const initialized = useAppSelector(appInitializeSelector)
    const {initializeMe} = useActions(authActions)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
    useEffect(() => {
        initializeMe()
    }, [initialized])
    if(!initialized) {
        return <CircularProgress sx={style} color="primary" />
    }
    return (
        <>
            <Header setDrawerOpen={setDrawerOpen}/>
            <AppDrawer setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen}/>
            <ErrorSnackBar/>
            <Suspense>
                <Outlet />
            </Suspense>
        </>
    )
}