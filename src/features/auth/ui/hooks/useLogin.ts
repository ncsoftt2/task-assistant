import {FormikHelpers, useFormik} from "formik";
import { LoginPayloadType } from "features/auth/api/authApi.types";
import {authActions} from "features/auth/index";
import {useAppDispatch} from "common/hooks/useAppDispatch";

export const useLogin = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
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