import {ErrorSnackBar} from "../ErrorSnackBar/ErrorSnackBar";
import { Header } from "../Header/header";
import {AppRoutes} from "./AppRoutes";
import {BrowserRouter} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {FC, useEffect} from "react";
import { CircularProgress } from "@mui/material";
import {initializedTC} from "../../store/reducers/app/app-reducer";

type PropsType = {
    demo?: boolean
}

export const App:FC<PropsType>= ({demo = false}) => {
    const {initialized} = useAppSelector(({app}) => app)
    const dispatch = useAppDispatch()
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
    useEffect(() => {
        if(demo) return
        dispatch(initializedTC())
    }, [initialized])
    if(!initialized) {
        return <CircularProgress sx={style} color="primary" />
    }
    return (
        <BrowserRouter>
            <Header />
            <ErrorSnackBar/>
            <AppRoutes demo={demo}/>
        </BrowserRouter>
    )
}