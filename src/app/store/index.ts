import {ActionCreatorsMapObject, AnyAction, bindActionCreators, combineReducers} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../../features/Login";
import {taskReducer} from "../../features/Tasks";
import {todoListReducer} from "../../features/TodoLists";
import {appReducer} from "..";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {useMemo} from "react";


export const reducers = combineReducers({
    tasks: taskReducer,
    todoList:todoListReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
    devTools: true
})
export type AppState = ReturnType<typeof reducers>
export type AppDispatch = ThunkDispatch<AppState, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<AppState> = useSelector

export function useActions <T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch()
    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
}
