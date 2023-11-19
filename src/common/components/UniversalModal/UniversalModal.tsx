import * as React from 'react';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {FC, memo, ReactNode} from "react";


const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(4),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(3),
    },
}))
type PropsType = {
    children: ReactNode
    open: boolean
    setOpen: (value: boolean) => void
}
export const UniversalModal: FC<PropsType> = memo(({children,setOpen,open}) => {
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                open={open}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent>
                    {children}
                </DialogContent>
            </BootstrapDialog>
        </>
    )
})