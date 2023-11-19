import { EditableTask } from "./ui/EditableTask";
import { Task } from "./ui/Task";
import * as tasksSelectors from "./model/selectors/taskSelectors";
import {tasksActionsCreators, tasksThunks} from "./model/slice/taskSlice";

const taskActions = {...tasksThunks,...tasksActionsCreators}
export {
    tasksSelectors,
    EditableTask,
    Task,
    taskActions
}