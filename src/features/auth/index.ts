import * as authSelectors from './model/selectors/authSelectors'
import {LoginAsync as Login} from "features/auth/ui/Login.async";
import {authActionsCreators, authThunks} from "features/auth/model/slice/auth.reducer";
import {authAPI} from "features/auth/api/authApi";
import {authReducer} from "features/auth/model/slice/auth.reducer";

const authActions = {...authThunks,...authActionsCreators}

export {
    authReducer,
    authSelectors,
    authActions,
    authAPI,
    Login
}