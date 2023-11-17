import {createHashRouter} from "react-router-dom";
import {App} from "app/ui/App";
import {ProtectedAuth} from "app/service/routes/ProtectedAuth";
import {TodoLists} from "features/TodoLists";
import {Login} from "features/Login";

export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    NOT_FOUND = 'not_found',
}

export const RoutePath:Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.NOT_FOUND]: '*',
}

export const router = createHashRouter([
    {
        element: <App/>,
        children: [
            {
                path: RoutePath.main,
                element: (
                    <ProtectedAuth>
                        <TodoLists/>
                    </ProtectedAuth>
                )
            },
            {
                path: RoutePath.login,
                element: <Login />
            } ,
            {
                path: RoutePath.not_found,
                element: <div>error</div>
            }
        ]
    }
])
