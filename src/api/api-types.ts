export type ResponseType<D = {}> = {
    data: D
    messages: string[]
    resultCode: number
}