import {FC, memo, ReactNode} from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import * as React from "react";

type PropsType = {
    setOpenModal: (b:boolean) => void
    openModal: boolean
    children: ReactNode
    width?: number

}

export const UniversalModal:FC<PropsType> = memo(({width = 350,children,openModal,setOpenModal}) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: width,
        bgcolor: 'background.paper',
        p: 2
    }
    const handleClose = () => setOpenModal(false);
    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleClose}
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    )
})