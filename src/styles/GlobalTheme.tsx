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