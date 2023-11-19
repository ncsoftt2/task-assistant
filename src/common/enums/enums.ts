export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriority {
    Low = 1,
    Middle = 2,
    High = 3,
    Later = 4,
    Urgently = 5
}

export enum ResultCode {
    SUCCESS = 0,
    FAILED = 1,
    CAPTCHA = 10
}