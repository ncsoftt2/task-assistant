import {useAppSelector} from "common/hooks/useAppSelector";
import {authSelectors} from "features/auth";
import {Navigate} from "react-router-dom";
import {RoutePath} from "app/providers/router/ui/AppRouter";
import {ReactNode} from "react";

export const AuthGuard = ({children}: { children:ReactNode }) => {
    const data = useAppSelector(authSelectors.userDataSelector)
    if(data) return <Navigate to={RoutePath.main}/>
    return <>{children}</>
}