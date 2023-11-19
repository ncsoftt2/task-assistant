import {ReactNode} from "react";
import { useAppSelector } from 'common/hooks/useAppSelector';
import { Navigate } from "react-router-dom";
import {RoutePath} from "app/model/routes/AppRoutes";
import {authSelectors} from "features/auth";

export const ProtectedAuth = ({children}: {children: ReactNode}) => {
    const auth = useAppSelector(authSelectors.isAuthSelector)
    if(!auth) return <Navigate to={RoutePath.login}/>
    return <>{children}</>
}