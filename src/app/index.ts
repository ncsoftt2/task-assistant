import { AppRoutes } from './model/routes/AppRoutes'
import * as appSelectors from './model/selectors/appSelectors'
import {appReducer, slice} from './model/slice/app-reducer'
import { App } from './ui/App'
import {initializedTC} from "./model/thunk/me";

const appActions = {initializedTC,...slice.actions}
export {
    appSelectors,
    appReducer,
    AppRoutes,
    App,
    appActions
}