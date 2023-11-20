import { AppRouter } from 'app/providers/router/ui/AppRouter'
import * as appSelectors from './model/selectors/appSelectors'
import {appReducer, slice} from './model/slice/app-reducer'
import {initializedTC} from "./model/thunk/me";

const appActions = {initializedTC,...slice.actions}
export {
    appSelectors,
    appReducer,
    AppRouter,
    appActions
}