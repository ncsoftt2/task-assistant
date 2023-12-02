import {makeStyles, Theme} from "mui-styles";
import {TaskDomainType} from "features/Tasks/model/slice/taskSlice";
import {useFormik} from "formik";
import {taskActions} from "features/Tasks/index";
import * as yup from "yup";
import {useActions} from "common/hooks/useActions";

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
    const {updateTask} = useActions(taskActions)
    const formik = useFormik({
        initialValues: {
            title: task.title,
            description: task.description === null ? "" : task.description,
            status: task.status,
            priority: task.priority
        },
        validationSchema: validationSchema,
        onSubmit: async (values,formikHelpers) => {
            formikHelpers.setSubmitting(true)
            await updateTask({taskId:task.id,todoId:task.todoListId,model: values})
                .unwrap()
                .then(() => setOpen(false))
                .finally(() => {
                    formikHelpers.setSubmitting(false)
                })
        }
    })
    return {formik}
}

const validationSchema = yup.object({
    title: yup.string().min(3,'Минимум 3 символа').max(100,'Максимум 100 символов'),
    description: yup.string().max(1000,'Максимум 1000 символов')
});