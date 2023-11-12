import {ErrorSnackBar} from "../../components/ErrorSnackBar/ErrorSnackBar";
import { Header } from "../../components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import {FC, useEffect, useState} from "react";
import { CircularProgress } from "@mui/material";
import { AppDrawer } from "../../widgets/Drawer";
import {appActions, AppRoutes, appSelectors} from "../index";
import {useActions, useAppSelector} from "../store";

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
        if(!demo) initializedTC()
    }, [initialized])
    if(!initialized) {
        return <CircularProgress sx={style} color="primary" />
    }
    return (
        <BrowserRouter>
            <Header setDrawerOpen={setDrawerOpen}/>
            <AppDrawer setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen}/>
            <ErrorSnackBar/>
            <AppRoutes demo={demo}/>
        </BrowserRouter>
    )
}