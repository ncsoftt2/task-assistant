import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "../../routes/routes";
import { Container } from "@mui/material";
import { Main } from "../Main/main";
import {Login} from "../../features/Login/Login";
import {FC} from "react";

type PropsType = {
    demo?:boolean
}

export const AppRoutes:FC<PropsType> = ({demo = false}) => (
    <Container>
        <Routes>
            <Route path={routes.main} element={<Main demo={demo}/>}/>
            <Route path={routes.login} element={<Login/>}/>
            <Route path={'*'} element={<Navigate to={routes.main}/>}/>
        </Routes>
    </Container>
)