export type FieldsErrorsType = {
    field: string
    error: string
}

export type BaseResponseType<D = {}> = {
    data: D
    messages: string[]
    resultCode: number
    fieldsErrors: [FieldsErrorsType]
}