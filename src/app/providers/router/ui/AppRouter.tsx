import {createHashRouter} from "react-router-dom";
import {App} from "app/App";
import TodoLists from "features/TodoLists/ui/TodoLists";
import { ProtectedAuth } from "common/components/ProtectedAuth/ProtectedAuth";
import {AuthGuard} from "common/components/AuthGuard/AuthGuard";
import {Login} from "features/auth";

export enum AppRouter {
    MAIN = 'main',
    LOGIN = 'login',
    NOT_FOUND = 'not_found',
}

export const RoutePath:Record<AppRouter, string> = {
    [AppRouter.MAIN]: '/',
    [AppRouter.LOGIN]: '/login',
    [AppRouter.NOT_FOUND]: '*',
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
                element: (
                    <AuthGuard>
                        <Login />
                    </AuthGuard>
                )
            } ,
            {
                path: RoutePath.not_found,
                element: <div>error</div>
            }
        ]
    }
])
