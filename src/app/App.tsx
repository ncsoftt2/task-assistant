import {Outlet} from "react-router-dom";
import {FC, Suspense, useEffect, useState} from "react";
import { CircularProgress } from "@mui/material";
import {appActions, appSelectors} from "app/index";
import { AppDrawer } from "widgets/Drawer";
import { Header } from "widgets/Header";
import { ErrorSnackBar } from "common/components";
import { useAppSelector } from 'common/hooks/useAppSelector';
import {useActions} from "common/hooks/useActions";
type PropsType = {
    demo?: boolean
}

export const App:FC<PropsType>= () => {
    const [drawerOpen,setDrawerOpen] = useState(false)
    const initialized = useAppSelector(appSelectors.appInitializeSelector)
    const {initializedTC} = useActions(appActions)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
    useEffect(() => {
        initializedTC()
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