import {AppState} from "app/store";

export const appInitializeSelector = (state:AppState) => state.app.initialized
export const appStatusSelector = (state:AppState) => state.app.status
export const appErrorSelector = (state:AppState) => state.app.error