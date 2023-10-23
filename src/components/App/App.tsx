import {Header} from "../Header/Header";
import { Main } from "../Main/Main";
import {useAppSelector} from "../../store/hooks";
import {Box, LinearProgress } from "@mui/material";
import {ErrorSnackBar} from "../ErrorSnackBar/ErrorSnackBar";
import {AppRoutes} from "./AppRoutes";
import {BrowserRouter} from "react-router-dom";

export const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <ErrorSnackBar/>
            <AppRoutes/>
        </BrowserRouter>
    )
}