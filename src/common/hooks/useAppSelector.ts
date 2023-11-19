import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppState} from "app/model/store";

export const useAppSelector:TypedUseSelectorHook<AppState> = useSelector