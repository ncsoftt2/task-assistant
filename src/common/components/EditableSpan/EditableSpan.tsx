import {TextField} from "@mui/material";
import {memo, useState, ChangeEvent} from "react";
import {BaseResponseType} from "common/types";


type EditableSpanPropsType = {
    value: string;
    onChange: (newValue: string) => Promise<any>;
};

export const EditableSpan = memo(({value,onChange}: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    const [error,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState('')
    let [title, setTitle] = useState(value)
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    };
    const activateViewMode = () => {
        const trimValue = title.trim()
        if (trimValue.length !== 0) {
            onChange(title)
                .then(() => {
                    setEditMode(false)
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
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value
        if (error) {
            setError(false)
            setErrorMessage('')
        }
        setTitle(target)
    }

    return editMode ? (
        <TextField
            value={title}
            onChange={changeTitle}
            autoFocus
            onBlur={activateViewMode}
            helperText={errorMessage}
            error={error}
        />
    ) : (
        <span onDoubleClick={activateEditMode}>{value}</span>
    )
})
