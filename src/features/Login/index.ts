import { useLogin } from "./ui/hooks/useLogin";
import * as authSelector from "./service/selectors/authSelectors";
import { authReducer } from "./service/slice/auth-reducer";
import { Login } from "./ui/Login";
import {loginTC} from "./service/thunk/login";
import {logoutTC} from "./service/thunk/logout";

const authTC = {loginTC,logoutTC}

export {
    Login,
    authSelector,
    authReducer,
    useLogin,
    authTC
}