import {AppState} from "../index";
import {TaskStateType} from "../../types/tasks-types";

export const tasksSelector = (state:AppState):TaskStateType => state.tasks