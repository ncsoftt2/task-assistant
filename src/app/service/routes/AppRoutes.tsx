import {createBrowserRouter} from "react-router-dom";
import {App} from "app/ui/App";
import {ProtectedAuth} from "app/service/routes/ProtectedAuth";
import {TodoLists} from "features/TodoLists";
import {Login} from "features/Login";

export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login'
}

export const RoutePath:Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/task-assistant',
    [AppRoutes.LOGIN]: '/task-assistant/login'
}

export const router = createBrowserRouter([
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
            }
        ]
    }
])
