import {Header} from "../Header/Header";
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