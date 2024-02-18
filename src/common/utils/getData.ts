export const getData = (datetime: Date) => {
    const date = new Date(datetime)
    const currentData = date.getDate().toString().padStart(2, '0')
    const currentMonth = (date.getMonth() + 1).toString().padStart(2, '0')
    const currentYear = date.getFullYear()

    return `${currentData}.${currentMonth}.${currentYear}`
}
