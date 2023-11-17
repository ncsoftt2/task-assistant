import {ErrorSnackBar} from "components/ErrorSnackBar/ErrorSnackBar";
import {Outlet} from "react-router-dom";
import {FC, Suspense, useEffect, useState} from "react";
import { CircularProgress } from "@mui/material";
import {appActions, appSelectors} from "../index";
import {useActions, useAppSelector} from "../store";
import { AppDrawer } from "widgets/Drawer";
import { Header } from "components/Header/header";

type PropsType = {
    demo?: boolean
}

export const App:FC<PropsType>= ({demo = false}) => {
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