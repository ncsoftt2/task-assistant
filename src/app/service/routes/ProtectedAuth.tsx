import {ReactNode} from "react";
import {useAppSelector} from "app/store";
import {isAuthSelector} from "features/Login/service/selectors/authSelectors";
import { Navigate } from "react-router-dom";
import {RoutePath} from "app/service/routes/AppRoutes";

export const ProtectedAuth = ({children}: {children: ReactNode}) => {
    const auth = useAppSelector(isAuthSelector)
    if(!auth) return <Navigate to={RoutePath.login}/>
    return <>{children}</>
}