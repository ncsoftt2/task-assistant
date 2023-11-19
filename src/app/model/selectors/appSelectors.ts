import {AppState} from "app/model/store";

export const appInitializeSelector = (state:AppState) => state.app.initialized
export const appStatusSelector = (state:AppState) => state.app.status
export const appUserDataSelector = (state:AppState) => state.app.userData
export const appErrorSelector = (state:AppState) => state.app.error