import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "../../routes/routes";
import { Container } from "@mui/material";
import { Main } from "../Main/main";
import {Login} from "../../features/Login/Login";

export const AppRoutes = () => (
    <Container>
        <Routes>
            <Route path={routes.main} element={<Main demo={false}/>}/>
            <Route path={routes.login} element={<Login/>}/>
            <Route path={'*'} element={<Navigate to={routes.main}/>}/>
        </Routes>
    </Container>
)