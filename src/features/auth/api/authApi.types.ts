export type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}