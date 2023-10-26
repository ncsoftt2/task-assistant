export type ReturnResponseType<D = {}> = {
    data: D
    messages: string[]
    resultCode: number
}

export type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}