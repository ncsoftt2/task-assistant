export type FieldsErrorsType = {
    field: string
    error: string
}

export type ReturnResponseType<D = {}> = {
    data: D
    messages: string[]
    resultCode: number
    fieldsErrors: [FieldsErrorsType]
}

export type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}