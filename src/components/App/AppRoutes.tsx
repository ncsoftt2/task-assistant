import {Route, Routes} from "react-router-dom";
import { Main } from "../Main/Main";
import {routes} from "../../routes/routes";
import { Container } from "@mui/material";

export const AppRoutes = () => (
    <Container>
        <Routes>
            <Route path={routes.main} element={<Main demo={false}/>}/>
            <Route path={'*'} element={<div>404 page not found</div>}/>
        </Routes>
    </Container>
)