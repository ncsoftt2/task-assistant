import { AppRoutes } from './service/routes/AppRoutes'
import * as appSelectors from './service/selectors/appSelectors'
import {appReducer, appSlice} from './service/slice/app-reducer'
import { App } from './ui/App'
import {initializedTC} from "./service/thunk/me";

const appActions = {initializedTC,...appSlice.actions}

export {
    appSelectors,
    appReducer,
    AppRoutes,
    App,
    appActions
}