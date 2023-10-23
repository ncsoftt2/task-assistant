import {AppState} from "../index";
import {TasksType} from "../reducers/tasks/task-reducer";

export const taskSelectors = (state:AppState):TasksType => state.tasks