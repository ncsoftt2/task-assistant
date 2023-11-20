import { Task } from "./ui/Task";
import {tasksActionsCreators, tasksThunks} from "./model/slice/taskSlice";

const taskActions = {...tasksThunks,...tasksActionsCreators}
export {
    Task,
    taskActions
}