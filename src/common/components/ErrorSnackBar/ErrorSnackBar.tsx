import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useActions} from "common/hooks/useActions";
import {appActions, appSelectors} from "app";
import { useAppSelector } from 'common/hooks/useAppSelector';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackBar = () => {
    const error = useAppSelector(appSelectors.appErrorSelector)
    const {setAppErrorAC} = useActions(appActions)
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAppErrorAC({error:null})
    }
    return (
        <Stack spacing={2} sx={{ width: '100%'}}>
            <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}