import { tasksSelectors } from "./service/selectors/taskSelectors";
import {taskReducer, slice} from "./service/slice/task-reducer";
import { EditableTask } from "./ui/EditableTask";
import { Task } from "./ui/Task";
import {deleteTaskTC} from "./service/thunk/deleteTask";
import {createTaskTC} from "./service/thunk/createTask";
import {updateTaskTC} from "./service/thunk/updateTask";
import {fetchTasksTC} from "./service/thunk/fetchTasks";



const taskActions = {deleteTaskTC,createTaskTC,updateTaskTC,fetchTasksTC,...slice.actions}

export {
    tasksSelectors,
    taskReducer,
    EditableTask,
    Task,
    taskActions
}