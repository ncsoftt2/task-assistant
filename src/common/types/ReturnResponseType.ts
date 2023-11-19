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