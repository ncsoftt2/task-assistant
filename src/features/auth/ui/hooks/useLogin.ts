import {useFormik} from "formik";
import {authActions} from "features/auth/index";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {BaseResponseType} from "common/types";

export const useLogin = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values,formikHelpers) => {
            formikHelpers.setSubmitting(true)
            dispatch(authActions.login(values))
                .unwrap()
                .catch((err:BaseResponseType) => {
                    err.fieldsErrors?.forEach((fieldError) => {
                        return formikHelpers.setFieldError(fieldError.field,fieldError.error)
                    })
                })
            formikHelpers.setSubmitting(false)
        }
    })
    return {formik}
}