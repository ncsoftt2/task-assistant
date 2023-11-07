import {AppState} from "../index";
import {TasksType} from "../reducers/tasks/slice/task-reducer";

export const taskSelectors = (state:AppState):TasksType => state.tasks