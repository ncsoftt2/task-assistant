import {ChangeEvent, KeyboardEvent, useState} from "react";
import {BaseResponseType} from "common/types";

export const useAddItemForm = (callback:(title: string) => Promise<any>) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const [disableValue, setDisableValue] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value
        if (error) {
            setError(false)
            setErrorMessage('')
        }
        setValue(target)
    }
    const handleClick = async () => {
        setDisableValue(true)
        const trimValue = value.trim()
        if (trimValue.length !== 0) {
            callback(value)
                .then(() => {
                    setValue('')
                })
                .catch((err: BaseResponseType) => {
                    setError(true)
                    if (err?.resultCode) {
                        setErrorMessage(err.messages[0])
                    }
                })
        } else {
            setError(true)
            setErrorMessage('Title is required')
        }
        setDisableValue(false)
    }
    const addNewItemOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClick()
        }
    }
    return {
        value,
        handleChange,
        error,
        errorMessage,
        addNewItemOnEnter,
        disableValue
    }
}