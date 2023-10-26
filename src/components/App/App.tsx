import {ErrorSnackBar} from "../ErrorSnackBar/ErrorSnackBar";
import { Header } from "../Header/header";
import {AppRoutes} from "./AppRoutes";
import {BrowserRouter} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect} from "react";
import {initializedTC} from "../../store/reducers/app/app-actions";
import { CircularProgress } from "@mui/material";

export const App = () => {
    const {initialized} = useAppSelector(({app}) => app)
    const dispatch = useAppDispatch()
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
    useEffect(() => {
        dispatch(initializedTC())
    }, [initialized])
    if(!initialized) {
        return <CircularProgress sx={style} color="primary" />
    }
    return (
        <BrowserRouter>
            <Header />
            <ErrorSnackBar/>
            <AppRoutes/>
        </BrowserRouter>
    )
}