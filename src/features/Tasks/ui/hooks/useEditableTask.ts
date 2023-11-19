import {makeStyles, Theme} from "mui-styles";
import {TaskDomainType} from "features/Tasks/model/slice/taskSlice";
import {useFormik} from "formik";
import {taskActions} from "features/Tasks/index";
import * as yup from "yup";
import { useAppDispatch } from "common/hooks/useAppDispatch";

export const useTaskStyles = makeStyles<Theme>(() => ({
    customList: {
        '& .MuiList-root': {
            padding:0
        },
    },
    taskCheckBox: {
        padding: 0,
        zIndex: 0
    },
    taskTitle: {
        margin:"0 10px",
        fontSize:'16px',
        wordBreak:'break-all',
        width:'100%',
        maxWidth:' 250px'
    }
}))

export const useEditableTask = (task:TaskDomainType,setOpen: (value: boolean) => void) => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            title: task.title,
            description: task.description === null ? "" : task.description,
            status: task.status,
            priority: task.priority
        },
        validationSchema: validationSchema,
        onSubmit: async(values) => {
            const action = await dispatch(taskActions.updateTaskTC({taskId:task.id,todoId:task.todoListId,model: values}))
            if(!taskActions.updateTaskTC.rejected.match(action)) {
                setOpen(false)
            } else {
                setTimeout(() => {
                    dispatch(taskActions.changeTaskStatusAC({taskId:task.id,todoId:task.todoListId,taskStatus:"idle"}))
                },2000)
            }
        }
    })
    return {formik}
}

const validationSchema = yup.object({
    title: yup.string().min(3,'Минимум 3 символа').max(15,'Максимум 15 символов'),
    description: yup.string().max(80,'Максимум 80 символов')
});