import {FormikHelpers, useFormik} from "formik";
import {useAppDispatch} from "app/model/store";
import { LoginPayloadType } from "features/auth/api/authApi.types";
import {authActions} from "features/auth/index";

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
            // if (!values.email) {
            //     errors.email = 'Обязательное свойство'
            // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            //     errors.email = 'Неправильный email'
            // }
            // if(!values.password) {
            //     errors.password = 'Обязательное свойство'
            // } else if (values.password.trim().length < 4) {
            //     errors.password = 'Минимум 4 символа'
            // }
            return errors
        },
        onSubmit: async(values,formikHelpers: FormikHelpers<LoginPayloadType>) => {
            formikHelpers.setSubmitting(true)
            const action = await dispatch(authActions.loginTC(values))
            if(authActions.loginTC.rejected.match(action)) {
                if(action.payload?.fieldsErrors?.length) {
                    const errorMessage = action.payload.fieldsErrors[0]
                    formikHelpers.setFieldError(errorMessage.field,errorMessage.error)
                }
            }
            formikHelpers.setSubmitting(false)
        }
    })
    return {formik}
}