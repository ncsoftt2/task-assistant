import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#6495de'
        },
        error: {
            main: '#a8241d'
        },
        success: {
            main: '#82ea7a'
        },
        secondary: {
            main: '#acb4ae'
        },
        warning: {
            main:'#cfff50'
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
        background: {
            paper: '#fff',
            default: '#fff',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.MuiButtonBase-root': {
                        fontSize: '16px',
                        lineHeight: '24px',
                        padding: '6px 15px',
                        textTransform: 'inherit',
                    },
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    '&.MuiList-root': {
                        padding: 0,
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiFormHelperText-root': {
                        color: 'red',
                        fontFamily: 'inherit',
                        margin: 0,
                        wordBreak: 'break-all',
                    },
                    '& .MuiFormLabel-root': {
                        '&.Mui-focused': {
                            color: 'inherit',
                        },
                        color: '#333333',
                        fontFamily: 'inherit',
                        position: 'relative',
                        transform: 'none',
                    },
                    '& .MuiInputBase-input': {
                        padding: '8px 10px',
                        width: '100%',
                    },
                    '& .MuiInputBase-root': {
                        fontFamily: 'inherit',
                        margin: 0,
                        padding:0,
                        position: 'relative',
                        width: '100%',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        '& legend': {
                            display: 'none',
                        },
                        top: 0,
                    },
                    '&.MuiFormControl-root': {
                        color: '#333333',
                        fontFamily: 'inherit',
                        margin: 0,
                        minWidth: '150px',
                        width: '100%',
                    },
                },
            },
        },
    },
    typography: {
        fontFamily: 'Montserrat',
        fontSize: 16,
    },
    breakpoints: {
        values: {
            xs: 320,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    }
})