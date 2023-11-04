import {useAppDispatch} from "../../../store/hooks";
import {useFormik} from "formik";
import {loginTC} from "../auth-reducer";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const useLogin = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Обязательное свойство'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Неправильный email'
            }
            if(!values.password) {
                errors.password = 'Обязательное свойство'
            } else if (values.password.trim().length < 4) {
                errors.password = 'Минимум 4 символа'
            }
            return errors
        },
        onSubmit: (values,{setSubmitting}) => {
            setSubmitting(true)
            dispatch(loginTC(values))
            setSubmitting(false)
        }
    })
    return {formik}
}