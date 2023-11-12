import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "../../../routes/routes";
import { Container } from "@mui/material";
import {FC} from "react";
import { Login } from "../../../features/Login";
import { TodoLists } from "../../../features/TodoLists";

type PropsType = {
    demo?:boolean
}

export const AppRoutes:FC<PropsType> = ({demo = false}) => (
    <Container>
        <Routes>
            <Route path={routes.main} element={<TodoLists demo={demo}/>}/>
            <Route path={routes.login} element={<Login/>}/>
            <Route path={'*'} element={<Navigate to={routes.main}/>}/>
        </Routes>
    </Container>
)