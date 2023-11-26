import {ReactNode} from "react";
import { useAppSelector } from 'common/hooks/useAppSelector';
import { Navigate } from "react-router-dom";
import {RoutePath} from "app/providers/router/ui/AppRouter";
import {authSelectors} from "features/auth";

export const ProtectedAuth = ({children}: {children: ReactNode}) => {
    const data = useAppSelector(authSelectors.userDataSelector)
    if(!data) return <Navigate to={RoutePath.login}/>
    return <>{children}</>
}