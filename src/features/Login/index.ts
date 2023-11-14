import { useLogin } from "./ui/hooks/useLogin";
import * as authSelector from "./service/selectors/authSelectors";
import { authReducer } from "./service/slice/auth-reducer";
import {LoginAsync as Login} from './ui/Login.async'
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