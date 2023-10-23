import {ChangeEvent, KeyboardEvent, useState} from "react";
import {RequestStatusType} from "../../../store/reducers/app/app-reducer";

export const useAddItemForm = (callback: (title: string) => void,status:RequestStatusType) => {
    const [value, setValue] = useState('')
    const [error,setError] = useState(false)
    const handleAddItem = () => {
        if (value.trim().length) {
            callback(value)
            setValue('')
        } else {
            setError(true)
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value
        if (error) {
            setError(false)
        }
        setValue(target)
    }
    const addItemOnEnter = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') handleAddItem()
    }
    return {
        value,
        handleChange,
        error,
        addItemOnEnter,
        handleAddItem
    }
}