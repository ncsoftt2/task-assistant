import {ReactNode} from "react";
import {useAppSelector} from "app/store";
import { Navigate } from "react-router-dom";
import {RoutePath} from "app/service/routes/AppRoutes";
import {authSelectors} from "features/auth";

export const ProtectedAuth = ({children}: {children: ReactNode}) => {
    const auth = useAppSelector(authSelectors.isAuthSelector)
    if(!auth) return <Navigate to={RoutePath.login}/>
    return <>{children}</>
}